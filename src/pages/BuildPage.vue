<script setup lang="ts">
import ArchitectureDiagram from '@/components/ArchitectureDiagram.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import StatusSummary from '@/components/StatusSummary.vue'

const repo = 'https://github.com/cayeyemito/portfolio'
</script>

<template>
  <SiteHeader base="/" />
  <main class="container page">
    <p class="eyebrow">Proyecto DevOps</p>
    <h1>Cómo está hecha esta web</h1>
    <p class="lead">
      Esta web es estática: Vue 3 compilado con Vite, en un bucket S3 privado y servida por
      CloudFront con HTTPS. Toda la infraestructura está en Terraform, GitHub Actions la despliega
      sin claves de AWS y un script en Python la revisa cada día.
      <a :href="repo">El código está en GitHub.</a>
    </p>

    <section>
      <h2>Arquitectura</h2>
      <ArchitectureDiagram />
    </section>

    <section>
      <h2>Pipeline</h2>
      <p>
        Hay dos workflows de GitHub Actions. Se autentican en AWS con OIDC: cada ejecución asume un
        rol IAM con credenciales temporales, limitado a este bucket y esta distribución.
      </p>
      <div class="two">
        <div class="card">
          <h3><code>ci.yml</code> · en cada pull request</h3>
          <ol class="steps">
            <li><code>npm ci</code>, lint y tests con Vitest</li>
            <li>Build del sitio</li>
            <li>Tests del script de operación y <code>shellcheck</code></li>
            <li>
              <code>terraform fmt -check</code>, <code>validate</code> y <code>plan</code>, con el
              plan publicado como comentario en la PR
            </li>
          </ol>
        </div>
        <div class="card">
          <h3><code>deploy.yml</code> · en cada push a <code>main</code></h3>
          <ol class="steps">
            <li>Build del sitio</li>
            <li>Asumir el rol IAM vía OIDC</li>
            <li><code>aws s3 sync</code> con caché larga para los assets y corta para el HTML</li>
            <li>Invalidación de la caché de CloudFront</li>
            <li>Comprobación final: la web responde 200</li>
          </ol>
        </div>
      </div>
    </section>

    <section>
      <h2>Infraestructura como código</h2>
      <p>
        Todo vive en <code>infra/</code>, con el estado de Terraform en un bucket S3 con versionado
        y bloqueo. Solo se crearon a mano el bucket del estado y el presupuesto inicial.
      </p>
      <ul>
        <li>Bucket S3 privado con bloqueo de acceso público y cifrado.</li>
        <li>
          CloudFront con Origin Access Control, HTTPS, cabeceras de seguridad y una CloudFront
          Function que sirve <code>index.html</code> en cada carpeta.
        </li>
        <li>Proveedor OIDC de GitHub y roles IAM de permisos mínimos.</li>
        <li>Bucket de logs de acceso con caducidad de 30 días.</li>
        <li>Alarma de presupuesto en AWS Budgets.</li>
      </ul>
    </section>

    <section>
      <h2>Operación</h2>
      <p>
        Un workflow programado ejecuta <code>ops/site_health.py</code> una vez al día. Comprueba que
        las páginas y los enlaces de los proyectos responden, cuántos días le quedan al certificado
        TLS, que el bucket tiene los ficheros esperados y qué errores 4xx y 5xx aparecen en los logs
        de CloudFront. El informe se publica en <a href="/status/">/status</a>; si algo falla, el
        job termina en rojo y GitHub avisa por email.
      </p>
      <StatusSummary detailed />
    </section>

    <section>
      <h2>Qué no cubre</h2>
      <p>
        No hay Kubernetes ni alta disponibilidad real: es un sitio estático en una sola cuenta de
        AWS. En producción separaría entornos en cuentas distintas, movería el
        <code>terraform apply</code> al pipeline con aprobación manual y añadiría alertas por SNS.
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

.two {
  display: grid;
  gap: 1rem;
}

@media (min-width: 800px) {
  .two {
    grid-template-columns: 1fr 1fr;
  }
}

.card h3 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
}
</style>
