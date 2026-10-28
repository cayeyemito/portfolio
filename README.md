# Portfolio · Cayetano Yeste

Mi portfolio personal y, a la vez, un proyecto DevOps completo: una web estática en Vue 3,
con la infraestructura de Azure definida en Terraform, despliegue continuo con GitHub Actions y OIDC,
y una monitorización diaria en Python que publica un informe de estado en `/status`.

## Arquitectura

```
                 git push
  Tú ──────────► GitHub ──► GitHub Actions ──OIDC──► Entra ID (acceso temporal)
                              │  ci · deploy · health         │
                              │                               ▼ azcopy
  Visitante ──HTTPS──────────────────────────► Azure Storage, web estática ($web + /status)
                                                   │
                                                   └──logs──► Log Analytics (30 días)
                                                                 ▲
                                                site_health.py / logs.sh (KQL)
```

- **Azure Storage con web estática.** Sirve el contenedor `$web` por HTTPS, con `index.html` en cada
  carpeta y `404.html` para las rutas que no existen. Solo HTTPS y TLS 1.2, y sin claves de acceso:
  todo entra con una identidad de Entra ID.
- **Log Analytics.** Recibe cada lectura de la web (tabla `StorageBlobLogs`) y se consulta con KQL.
- **GitHub Actions.** No guarda ningún secreto de Azure: Entra ID cambia el token OIDC de cada
  ejecución por un acceso temporal, solo para este repositorio y la rama o PR esperadas.

## Estructura

| Ruta                                                | Qué hay                                                                                                  |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `src/`                                              | Frontend en Vue 3 + TypeScript. Los proyectos se leen de `src/data/projects.json`                        |
| `src/i18n/`                                         | Textos en español (`es.ts`) e inglés (`en.ts`). El tipo `Messages` obliga a que tengan las mismas claves |
| `index.html`, `como-esta-hecha/`, `en/`, `404.html` | Páginas del build multipágina de Vite: español en `/` e inglés en `/en/`, con los mismos componentes     |
| `infra/azure/`                                      | Terraform desplegado: `main.tf`, `variables.tf`, `outputs.tf` y `backend.tf`                             |
| `infra/aws/`                                        | La misma arquitectura para AWS, validada pero sin desplegar ([ver abajo](#la-versión-de-aws))            |
| `ops/site_health.py`                                | Comprobaciones diarias e informe HTML/JSON                                                               |
| `ops/logs.sh`                                       | Resumen de errores de los logs de acceso con `az`, `grep`, `awk` y `sort \| uniq -c`                     |
| `.github/workflows/`                                | `ci.yml` (PR), `deploy.yml` (push a `main`) y `health.yml` (diario)                                      |
| `Dockerfile`                                        | Build reproducible y previsualización local con Nginx                                                    |

## Desarrollo local

```sh
npm ci
npm run dev          # http://localhost:5173
npm run lint
npm test
npm run build        # genera dist/
```

Para previsualizar el build en Nginx, con las mismas reglas de rutas que la web estática de Azure:

```sh
docker build -t portfolio .
docker run --rm -p 8080:8080 portfolio   # http://localhost:8080
```

Para el script de operación:

```sh
python -m venv .venv && . .venv/bin/activate   # en Windows: .venv\Scripts\activate
pip install -r ops/requirements-dev.txt
python -m pytest ops/tests
python ops/site_health.py --url https://<cuenta>.z6.web.core.windows.net --smoke
```

## Desplegarlo desde cero

### 1. Preparar la suscripción de Azure (a mano y una sola vez)

1. Crear la cuenta y pasarla a pago por uso. Azure no tiene un tope de gasto en pago por uso:
   crear en **Cost Management → Presupuestos** un presupuesto pequeño con avisos por email.
2. Instalar la CLI de Azure e iniciar sesión con `az login`.
3. Crear la cuenta de Storage del estado de Terraform, con versionado, papelera y sin claves de
   acceso (solo identidad). West Europe no admitía clientes nuevos, por eso `spaincentral`:

   ```sh
   az group create -n rg-portfolio-tfstate -l spaincentral
   az storage account create -n stportfoliotf9766eb -g rg-portfolio-tfstate -l spaincentral \
     --sku Standard_LRS --kind StorageV2 --https-only true --min-tls-version TLS1_2 \
     --allow-blob-public-access false --allow-shared-key-access false
   az storage account blob-service-properties update -n stportfoliotf9766eb -g rg-portfolio-tfstate \
     --enable-versioning true --enable-delete-retention true --delete-retention-days 7
   az role assignment create --assignee-object-id "$(az ad signed-in-user show --query id -o tsv)" \
     --assignee-principal-type User --role "Storage Blob Data Contributor" \
     --scope "$(az storage account show -n stportfoliotf9766eb -g rg-portfolio-tfstate --query id -o tsv)"
   az storage container create -n tfstate --account-name stportfoliotf9766eb --auth-mode login
   ```

   Ser propietario de la suscripción no da acceso a los datos de un Storage: por eso hace falta el
   rol _Storage Blob Data Contributor_.

### 2. Crear la infraestructura (en local)

```sh
cd infra/azure
cp terraform.tfvars.example terraform.tfvars  # pon el id de la suscripción y tu email
terraform init
terraform plan
terraform apply
terraform output github_variables
```

El backend (`backend.tf`) apunta a la cuenta del paso 1 y entra con tu identidad
(`use_azuread_auth`). El _lease_ del blob hace de bloqueo del estado.

### 3. Primer despliegue a mano

```sh
npm run build
ACCOUNT=$(terraform -chdir=infra/azure output -raw site_storage_account)
AZCOPY_AUTO_LOGIN_TYPE=AZCLI azcopy sync dist "https://$ACCOUNT.blob.core.windows.net/\$web" \
  --delete-destination=true --exclude-path "status"
```

### 4. Conectar GitHub

Ve a **Settings → Secrets and variables → Actions → Variables** y crea estas variables. No son
secretos: con OIDC solo hacen falta identificadores.

| Variable                 | Valor                   |
| ------------------------ | ----------------------- |
| `AZURE_TENANT_ID`        | `github_variables`      |
| `AZURE_SUBSCRIPTION_ID`  | `github_variables`      |
| `AZURE_DEPLOY_CLIENT_ID` | `github_variables`      |
| `AZURE_PLAN_CLIENT_ID`   | `github_variables`      |
| `SITE_STORAGE_ACCOUNT`   | `github_variables`      |
| `LOG_WORKSPACE_ID`       | `github_variables`      |
| `SITE_URL`               | `github_variables`      |
| `BUDGET_EMAIL`           | el email de las alertas |

A partir de aquí, cada push a `main` despliega solo. Puedes lanzar `health.yml` a mano desde la
pestaña Actions para generar el primer `/status`.

## Pipeline

**`ci.yml`, en cada pull request:**

1. Instala con `npm ci` y pasa lint, Prettier, Vitest y build.
2. Pasa `pytest` sobre `ops/` y `shellcheck` sobre `logs.sh`.
3. Pasa `terraform fmt -check`, `validate` y `plan` con la identidad de solo lectura, y publica el
   plan como comentario en la PR.

**`deploy.yml`, en cada push a `main`:**

1. Tests y build.
2. Inicia sesión en Azure con OIDC (`azure/login`).
3. Ejecuta `azcopy sync`. `assets/` lleva caché de un año porque los nombres tienen hash; el HTML
   lleva `max-age=0`. `status/` se excluye para que el borrado de ficheros viejos no toque el informe.
4. Hace una prueba de humo: las páginas propias responden 200 y una ruta inexistente, 404.

No hay CDN delante, así que no hay caché que invalidar.

**`health.yml`, cada día a las 06:00 UTC:** lanza `site_health.py` con todas las comprobaciones,
guarda el informe como artefacto y lo publica en `/status`. Si algo falla, el job termina en rojo y
GitHub avisa por email.

## Seguridad y costes

- No hay secretos de Azure en el repositorio ni en GitHub: solo OIDC con _federated credentials_.
- La identidad `portfolio-github-deploy` solo acepta tokens de la rama `main` de este repositorio.
  Puede escribir en la cuenta de Storage de la web y leer sus logs, y nada más.
- La identidad `portfolio-github-plan` solo acepta tokens de pull requests: lectura de la
  suscripción, del estado de Terraform y de los registros de aplicaciones (`Application.Read.All`).
  El plan corre con `-lock=false` para no necesitar escritura sobre el estado.
- Ninguna cuenta de Storage admite claves de acceso (`shared_access_key_enabled = false`).
- Log Analytics tiene una cuota diaria de 0,1 GB como freno y guarda 30 días.
- Con el tráfico de un portfolio, Storage y Log Analytics deberían costar céntimos al mes. Hay un
  presupuesto general de la cuenta y otro del grupo de recursos, con avisos al 50 %, al 100 % y
  cuando la previsión supera el 100 %.

## Decisiones

- **Vue 3 + Vite, sin router.** Son tres páginas estáticas. Un build multipágina evita el
  "fallback" de SPA, que convertiría todos los 404 en 200.
- **Web estática de Storage sin CDN.** Front Door tiene una cuota fija mensual que no compensa en un
  portfolio. El precio: sin dominio propio con HTTPS ni cabeceras de seguridad propias.
- **Sin claves de acceso en ningún Storage.** Todo entra con identidad, queda registrado y no hay
  ninguna contraseña maestra que pueda filtrarse.
- **Dos identidades en lugar de una.** El plan de las PR no debe poder escribir nada.
- **KQL en lugar de descargar logs.** Log Analytics agrupa en el servidor y el script recibe ya los
  errores por ruta.
- **Sin chat con IA en la v1.** Necesita servidor; volvería con Azure Functions.

## La versión de AWS

`infra/aws/` tiene la misma arquitectura para AWS: S3 privado, CloudFront con Origin Access
Control y una CloudFront Function para servir `index.html` en cada carpeta, roles IAM con OIDC,
bucket de logs con caducidad y AWS Budgets. Pasa `terraform validate`, pero nunca se ha desplegado:
la cuenta nueva se quedó bloqueada en la verificación y el portfolio pasó a Azure. Los workflows y
el script de operación de este repositorio ya son los de Azure.

## Qué haría distinto en producción

- Suscripciones separadas por entorno (grupos de administración) y un entorno de staging.
- Front Door con dominio propio, certificado gestionado, cabeceras de seguridad y WAF.
- `terraform apply` en el pipeline (`workflow_dispatch` con aprobación en un environment protegido)
  en lugar de en local.
- Alertas de Azure Monitor sobre la tasa de 5xx, con un grupo de acciones a email o Teams, en vez
  de depender del email de GitHub.
- Este proyecto no cubre Kubernetes ni alta disponibilidad real.
