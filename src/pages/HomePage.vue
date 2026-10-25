<script setup lang="ts">
import ArchitectureDiagram from '@/components/ArchitectureDiagram.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import StatusSummary from '@/components/StatusSummary.vue'
import { cvs, experience, profile } from '@/data/profile'
import { projects } from '@/lib/projects'

const mainCv = cvs[0]!
</script>

<template>
  <SiteHeader />
  <main>
    <section id="inicio" class="container hero">
      <p class="eyebrow">{{ profile.location }}</p>
      <h1>{{ profile.name }}</h1>
      <p class="headline">{{ profile.headline }}</p>
      <p class="intro muted">{{ profile.intro }}</p>
      <div class="actions">
        <a :href="mainCv.href" class="button primary" download>CV en PDF</a>
        <a :href="profile.links.github" class="button">GitHub</a>
        <a :href="profile.links.linkedin" class="button">LinkedIn</a>
      </div>
    </section>

    <section id="proyectos" class="section">
      <div class="container">
        <h2 class="section-title">Proyectos</h2>
        <div class="grid">
          <ProjectCard v-for="p in projects" :key="p.slug" :project="p" />
        </div>
      </div>
    </section>

    <section id="como-esta-hecha" class="section">
      <div class="container stack">
        <h2 class="section-title">Cómo está hecha esta web</h2>
        <p>
          Esta web es estática y vive en un bucket S3 privado servido por CloudFront. La
          infraestructura está definida en Terraform, cada push a <code>main</code> la despliega
          GitHub Actions y un script en Python la revisa cada día.
        </p>
        <ArchitectureDiagram />
        <StatusSummary />
        <p><a href="/como-esta-hecha/">Ver el pipeline, la infraestructura y la operación →</a></p>
      </div>
    </section>

    <section id="experiencia" class="section">
      <div class="container">
        <h2 class="section-title">Experiencia</h2>
        <ol class="jobs">
          <li v-for="job in experience" :key="job.company">
            <h3>
              {{ job.role }} <span class="muted">· {{ job.company }}</span>
            </h3>
            <p class="period">{{ job.period }}</p>
            <p class="muted">{{ job.summary }}</p>
          </li>
        </ol>
        <p class="cvs">
          CV completo en PDF:
          <template v-for="(cv, i) in cvs" :key="cv.href">
            <span v-if="i > 0" aria-hidden="true"> · </span>
            <a :href="cv.href" download>{{ cv.label }}</a>
          </template>
        </p>
      </div>
    </section>

    <section id="contacto" class="section">
      <div class="container">
        <h2 class="section-title">Contacto</h2>
        <p>
          Escríbeme a <a :href="`mailto:${profile.email}`">{{ profile.email }}</a> o por
          <a :href="profile.links.linkedin">LinkedIn</a>.
        </p>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>

<style scoped>
.hero {
  padding: 5rem 1rem 4rem;
}

h1 {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  letter-spacing: -0.02em;
}

.headline {
  font-size: 1.35rem;
  font-weight: 500;
  margin: 0.5rem 0 1rem;
}

.intro {
  max-width: 40rem;
  margin: 0 0 2rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.grid {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 800px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stack > * + * {
  margin-top: 1.5rem;
}

.stack > p {
  max-width: 44rem;
}

.jobs {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}

.jobs li + li {
  margin-top: 1.5rem;
}

.jobs h3 {
  font-size: 1.1rem;
}

.jobs p {
  margin: 0.3rem 0 0;
  max-width: 44rem;
}

.jobs .period {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--muted);
  margin-top: 0.15rem;
}
</style>
