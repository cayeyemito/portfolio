<script setup lang="ts">
import ArchitectureDiagram from '@/components/ArchitectureDiagram.vue'
import CiLog from '@/components/CiLog.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import StatusSummary from '@/components/StatusSummary.vue'

const repo = 'https://github.com/cayeyemito/portfolio'

const workflows = [
  {
    file: 'ci.yml',
    trigger: 'en cada pull request',
    steps: [
      { name: 'npm ci' },
      { name: 'lint', detail: 'oxlint, ESLint y Prettier' },
      { name: 'tests', detail: 'Vitest' },
      { name: 'build' },
      { name: 'pytest · shellcheck', detail: 'script de operación' },
      { name: 'terraform fmt · validate · plan', detail: 'plan comentado en la PR' },
    ],
  },
  {
    file: 'deploy.yml',
    trigger: 'en cada push a main',
    steps: [
      { name: 'build' },
      { name: 'azure/login', detail: 'OIDC con Entra ID, sin secretos' },
      { name: 'azcopy sync', detail: 'caché larga para assets, corta para HTML' },
      { name: 'smoke test', detail: 'la web responde 200' },
    ],
  },
  {
    file: 'health.yml',
    trigger: 'cada día a las 06:00 UTC',
    steps: [
      { name: 'site_health.py', detail: 'HTTP, TLS, ficheros y logs con KQL' },
      { name: 'publish /status', detail: 'report.html y report.json' },
    ],
  },
]
</script>

<template>
  <SiteHeader base="/" />
  <main class="container page">
    <p class="eyebrow">Proyecto DevOps</p>
    <h1>Cómo está hecha esta web</h1>
    <p class="lead">
      Esta web es estática: Vue 3 compilado con Vite y servida con HTTPS desde Azure Storage. Toda
      la infraestructura está en Terraform, GitHub Actions la despliega sin guardar ningún secreto y
      un script en Python la revisa cada día.
      <a :href="repo">El código está en GitHub.</a>
    </p>

    <section>
      <h2>Arquitectura</h2>
      <ArchitectureDiagram />
    </section>

    <section>
      <h2>Pipeline</h2>
      <p>
        Hay tres workflows de GitHub Actions. Se autentican en Azure con OIDC: Entra ID cambia el
        token de cada ejecución por un acceso temporal, solo si viene de este repositorio y de la
        rama o la pull request esperadas, y con permisos limitados a esta cuenta de Storage.
      </p>
      <CiLog v-for="w in workflows" :key="w.file" v-bind="w" />
    </section>

    <section>
      <h2>Infraestructura como código</h2>
      <p>
        Todo vive en <code>infra/azure/</code>, con el estado de Terraform en una cuenta de Storage
        con versionado. Solo se crearon a mano esa cuenta y el presupuesto general.
      </p>
      <ul>
        <li>
          Cuenta de Storage con web estática (<code>index.html</code> en cada carpeta y
          <code>404.html</code>), solo HTTPS y TLS 1.2, y sin claves de acceso: todo entra con
          identidad.
        </li>
        <li>
          Dos identidades de Entra ID con <em>federated credentials</em> para GitHub: la de
          despliegue solo puede escribir en esa cuenta; la del plan, solo leer.
        </li>
        <li>Logs de acceso en Log Analytics durante 30 días, con una cuota diaria como freno.</li>
        <li>Presupuesto con avisos al 50 %, al 100 % y por previsión.</li>
      </ul>
    </section>

    <section>
      <h2>Operación</h2>
      <p>
        Un workflow programado ejecuta <code>ops/site_health.py</code> una vez al día. Comprueba que
        las páginas y los enlaces de los proyectos responden, cuántos días le quedan al certificado
        TLS, que la web tiene los ficheros esperados y qué errores 4xx y 5xx aparecen en los logs,
        con una consulta KQL a Log Analytics. El informe se publica en
        <a href="/status/">/status</a>; si algo falla, el job termina en rojo y GitHub avisa por
        email.
      </p>
      <StatusSummary detailed />
    </section>

    <section>
      <h2>De AWS a Azure</h2>
      <p>
        La infraestructura se diseñó primero para AWS: S3 privado, CloudFront con Origin Access
        Control, roles IAM con OIDC y AWS Budgets. Sigue en <code>infra/aws/</code>, validada pero
        sin desplegar, porque la cuenta nueva se quedó bloqueada en la verificación. La pasé a
        Azure, donde la arquitectura es la misma idea con otras piezas: Storage en lugar de S3,
        Entra ID en lugar de IAM y Log Analytics en lugar de los logs de CloudFront.
      </p>
    </section>

    <section>
      <h2>Qué no cubre</h2>
      <p>
        No hay Kubernetes ni alta disponibilidad real: es un sitio estático en una sola suscripción.
        Tampoco hay CDN: en Azure costaría una cuota fija mensual (Front Door) y, para un portfolio,
        la web estática de Storage basta. En producción separaría entornos en suscripciones
        distintas, pondría Front Door con dominio propio y cabeceras de seguridad, y movería el
        <code>terraform apply</code> al pipeline con aprobación manual.
      </p>
    </section>
  </main>
  <SiteFooter />
</template>

<style scoped>
.page {
  padding-top: 3.5rem;
  padding-bottom: 4rem;
}

h1 {
  font-size: clamp(2rem, 6vw, 3rem);
  letter-spacing: -0.02em;
}

.lead {
  font-size: 1.15rem;
  max-width: 44rem;
  margin: 1rem 0 0;
}

section {
  margin-top: 3.5rem;
}

section > h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

section > p,
section > ul {
  max-width: 44rem;
}

section > * + * {
  margin-top: 1rem;
}
</style>
