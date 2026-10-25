# Portfolio · Cayetano Yeste

Mi portfolio personal y, a la vez, un proyecto DevOps completo: una web estática en Vue 3,
con la infraestructura de AWS definida en Terraform, despliegue continuo con GitHub Actions y OIDC,
y una monitorización diaria en Python que publica un informe de estado en `/status`.

## Arquitectura

```
                 git push
  Tú ──────────► GitHub ──► GitHub Actions ──OIDC──► Rol IAM temporal
                              │  ci · deploy · health         │
                              │                               ▼
  Visitante ──HTTPS──► CloudFront ──OAC──► S3 privado (web + /status)
                           │
                           └──logs──► S3 logs (30 días) ◄── site_health.py / logs.sh
```

- **S3 privado.** Tiene el acceso público bloqueado y solo CloudFront lo lee, con Origin Access Control.
- **CloudFront.** Fuerza HTTPS, añade las cabeceras de seguridad gestionadas y usa una
  [CloudFront Function](infra/functions/index-rewrite.js) para servir `index.html` en cada carpeta.
  `/status/*` no se cachea.
- **GitHub Actions.** No guarda ninguna clave de AWS: cada job asume un rol con credenciales temporales vía OIDC.

## Estructura

| Ruta | Qué hay |
| --- | --- |
| `src/` | Frontend en Vue 3 + TypeScript. Los proyectos se leen de `src/data/projects.json` |
| `index.html`, `como-esta-hecha/`, `404.html` | Páginas del build multipágina de Vite |
| `infra/` | Terraform: `main.tf`, `variables.tf`, `outputs.tf` y `backend.tf` |
| `ops/site_health.py` | Comprobaciones diarias e informe HTML/JSON |
| `ops/logs.sh` | Resumen de errores de los logs de CloudFront con `grep`, `awk` y `sort \| uniq -c` |
| `.github/workflows/` | `ci.yml` (PR), `deploy.yml` (push a `main`) y `health.yml` (diario) |
| `Dockerfile` | Build reproducible y previsualización local con Nginx |

## Desarrollo local

```sh
npm ci
npm run dev          # http://localhost:5173
npm run lint
npm test
npm run build        # genera dist/
```

Para previsualizar el build en Nginx, con las mismas reglas de rutas que CloudFront:

```sh
docker build -t portfolio .
docker run --rm -p 8080:8080 portfolio   # http://localhost:8080
```

Para el script de operación:

```sh
python -m venv .venv && . .venv/bin/activate   # en Windows: .venv\Scripts\activate
pip install -r ops/requirements-dev.txt
python -m pytest ops/tests
python ops/site_health.py --url https://<tu-distribucion>.cloudfront.net --smoke
```

## Desplegarlo desde cero

### 1. Preparar la cuenta de AWS (a mano y una sola vez)

1. Activar MFA en el usuario raíz y no volver a usarlo.
2. Crear un usuario de trabajo con IAM Identity Center y MFA, y configurar la AWS CLI con él.
3. Crear en la consola una alarma de presupuesto de 5 USD en AWS Budgets. Es una red de seguridad
   hasta que Terraform cree la suya.
4. Crear el bucket del estado de Terraform, con versionado:

   ```sh
   ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
   aws s3api create-bucket --bucket portfolio-tfstate-$ACCOUNT --region eu-west-1 \
     --create-bucket-configuration LocationConstraint=eu-west-1
   aws s3api put-bucket-versioning --bucket portfolio-tfstate-$ACCOUNT \
     --versioning-configuration Status=Enabled
   aws s3api put-public-access-block --bucket portfolio-tfstate-$ACCOUNT \
     --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
   ```

### 2. Crear la infraestructura (en local)

```sh
cd infra
cp backend.hcl.example backend.hcl            # pon el nombre del bucket del estado
cp terraform.tfvars.example terraform.tfvars  # pon tu email
terraform init -backend-config=backend.hcl
terraform plan
terraform apply
terraform output github_variables
```

El estado usa el bloqueo nativo de S3 (`use_lockfile`), así que no hace falta una tabla de DynamoDB.

### 3. Primer despliegue a mano

```sh
npm run build
aws s3 sync dist/ s3://$(terraform -chdir=infra output -raw site_bucket) --delete --exclude "status/*"
```

### 4. Conectar GitHub

Ve a **Settings → Secrets and variables → Actions → Variables** y crea estas variables. No son
secretos, porque no hay ninguna clave:

| Variable | Valor |
| --- | --- |
| `AWS_REGION` | `eu-west-1` |
| `AWS_DEPLOY_ROLE_ARN` | output `deploy_role_arn` |
| `AWS_PLAN_ROLE_ARN` | output `plan_role_arn` |
| `SITE_BUCKET` | output `site_bucket` |
| `LOGS_BUCKET` | output `logs_bucket` |
| `DISTRIBUTION_ID` | output `distribution_id` |
| `SITE_URL` | output `site_url` |
| `TF_STATE_BUCKET` | el bucket del paso 1 |
| `BUDGET_EMAIL` | el email de las alertas |

A partir de aquí, cada push a `main` despliega solo. Puedes lanzar `health.yml` a mano desde la
pestaña Actions para generar el primer `/status`.

## Pipeline

**`ci.yml`, en cada pull request:**

1. Instala con `npm ci` y pasa lint, Prettier, Vitest y build.
2. Pasa `pytest` sobre `ops/` y `shellcheck` sobre `logs.sh`.
3. Pasa `terraform fmt -check`, `validate` y `plan` con un rol de solo lectura, y publica el plan
   como comentario en la PR.

**`deploy.yml`, en cada push a `main`:**

1. Tests y build.
2. Asume el rol de despliegue con OIDC.
3. Ejecuta `aws s3 sync`. `assets/` lleva caché de un año porque los nombres tienen hash; el HTML
   lleva `max-age=0`. `status/` se excluye para que `--delete` no borre el informe.
4. Invalida CloudFront y espera a que termine.
5. Hace una prueba de humo: las páginas propias responden 200 y una ruta inexistente, 404.

**`health.yml`, cada día a las 06:00 UTC:** lanza `site_health.py` con todas las comprobaciones,
guarda el informe como artefacto y lo publica en `/status`. Si algo falla, el job termina en rojo y
GitHub avisa por email.

## Seguridad y costes

- No hay claves de AWS en el repositorio ni en GitHub: solo OIDC.
- El rol `deploy` solo acepta tokens de la rama `main` de este repositorio. Puede escribir en el
  bucket de la web, leer el de logs e invalidar esta distribución, y nada más.
- El rol `plan` solo acepta tokens de pull requests y tiene `ReadOnlyAccess`. El plan corre con
  `-lock=false` para no necesitar permisos de escritura sobre el estado.
- Los dos buckets son privados y están cifrados. Los logs caducan a los 30 días.
- Con el tráfico de un portfolio, S3 y CloudFront deberían costar céntimos al mes. El presupuesto
  avisa al llegar al 80 % de 5 USD y cuando la previsión supera el 100 %.

## Decisiones

- **Vue 3 + Vite, sin router.** Son tres páginas estáticas. Un build multipágina evita el
  "fallback" de SPA, que en CloudFront convertiría todos los 404 en 200.
- **CloudFront Function en lugar del endpoint web de S3.** El endpoint web obliga a un bucket
  público y no admite HTTPS. Con OAC el bucket sigue privado.
- **Bloqueo nativo de S3 para el estado.** Terraform 1.10+ ya no necesita DynamoDB.
- **Dos roles en lugar de uno.** El plan de las PR no debe poder escribir nada.
- **Sin chat con IA en la v1.** Necesita servidor; volvería en la fase de eventos con
  API Gateway + Lambda.

## Qué haría distinto en producción

- Cuentas separadas por entorno (AWS Organizations) y un entorno de staging.
- `terraform apply` en el pipeline (`workflow_dispatch` con aprobación en un environment protegido)
  en lugar de en local.
- Alertas por SNS o Slack en vez de depender del email de GitHub, y alarmas de CloudWatch sobre la
  tasa de 5xx.
- WAF delante de CloudFront y logs en tiempo real si hubiera tráfico de verdad.
- Este proyecto no cubre Kubernetes ni alta disponibilidad real.
