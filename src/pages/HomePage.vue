<script setup lang="ts">
import ArchitectureDiagram from '@/components/ArchitectureDiagram.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import RichText from '@/components/RichText.vue'
import StatusLine from '@/components/StatusLine.vue'
import StatusSummary from '@/components/StatusSummary.vue'
import { profile } from '@/data/profile'
import { pages, useLocale, useMessages } from '@/i18n'
import { projectsFor } from '@/lib/projects'

const locale = useLocale()
const m = useMessages()
const projects = projectsFor(locale)
const mainCv = m.cvs[0]!
</script>

<template>
  <SiteHeader page="home" />
  <main>
    <section id="top" class="container hero">
      <p class="eyebrow">{{ m.profile.location }}</p>
      <h1>{{ profile.name }}</h1>
      <StatusLine />
      <p class="headline">{{ m.profile.headline }}</p>
      <p class="intro muted">{{ m.profile.intro }}</p>
      <div class="actions">
        <a :href="mainCv.href" class="button primary" download>{{ m.profile.cvButton }}</a>
        <a :href="profile.links.github" class="button">GitHub</a>
        <a :href="profile.links.linkedin" class="button">LinkedIn</a>
      </div>
    </section>

    <section id="projects" class="section">
      <div class="container">
        <h2 class="section-title">{{ m.projects.title }}</h2>
        <div class="grid">
          <ProjectCard v-for="p in projects" :key="p.slug" :project="p" />
        </div>
      </div>
    </section>

    <section id="build" class="section">
      <div class="container stack">
        <h2 class="section-title">{{ m.home.buildTitle }}</h2>
        <p><RichText :text="m.home.buildIntro" /></p>
        <p class="pipeline" :aria-label="m.home.pipelineLabel">
          <template v-for="(step, i) in ['lint', 'tests', 'build', 'deploy']" :key="step">
            <span v-if="i > 0" class="muted" aria-hidden="true"> · </span>
            <span class="check" aria-hidden="true">✓</span> {{ step }}
          </template>
        </p>
        <ArchitectureDiagram />
        <StatusSummary />
        <p>
          <a :href="pages.build[locale]">{{ m.home.buildMore }}</a>
        </p>
      </div>
    </section>

    <section id="experience" class="section">
      <div class="container">
        <h2 class="section-title">{{ m.home.experienceTitle }}</h2>
        <ol class="jobs">
          <li v-for="job in m.experience" :key="job.company">
            <h3>
              {{ job.role }} <span class="muted">· {{ job.company }}</span>
            </h3>
            <p class="period">{{ job.period }}</p>
            <p class="muted">{{ job.summary }}</p>
          </li>
        </ol>
        <p class="cvs">
          {{ m.home.cvsLabel }}
          <template v-for="(cv, i) in m.cvs" :key="cv.href">
            <span v-if="i > 0" aria-hidden="true"> · </span>
            <a :href="cv.href" download>{{ cv.label }}</a>
          </template>
        </p>
      </div>
    </section>

    <section id="contact" class="section">
      <div class="container">
        <h2 class="section-title">{{ m.home.contactTitle }}</h2>
        <p>
          {{ m.home.contactBefore }}
          <a :href="`mailto:${profile.email}`">{{ profile.email }}</a> {{ m.home.contactOr }}
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
  font-size: clamp(2.25rem, 7vw, 3.25rem);
  letter-spacing: -0.02em;
  margin-bottom: 0.6rem;
}

.headline {
  font-size: 1.35rem;
  font-weight: 500;
  margin: 1.25rem 0 1rem;
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

.stack > * + * {
  margin-top: 1.5rem;
}

.pipeline {
  font-family: var(--mono);
  font-size: 0.85rem;
}

.pipeline .check {
  color: var(--ok);
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
