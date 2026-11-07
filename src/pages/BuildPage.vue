<script setup lang="ts">
import '@/styles/case.css'
import ArchitectureDiagram from '@/components/ArchitectureDiagram.vue'
import CiLog from '@/components/CiLog.vue'
import RichText from '@/components/RichText.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import StatusLine from '@/components/StatusLine.vue'
import StatusSummary from '@/components/StatusSummary.vue'
import { localizePath, pages, useLocale, useMessages } from '@/i18n'
import { projectsFor } from '@/lib/projects'

// Case page of the portfolio project (02). Layout in styles/case.css, shared with Frimee.
const locale = useLocale()
const m = useMessages()
const b = m.build
const projects = projectsFor(locale)
const index = projects.findIndex((p) => p.slug === 'portfolio')
const project = projects[index]!
const number = String(index + 1).padStart(2, '0')
// The other project, linked at the bottom: its case page, or its card on the home page.
const other = projects.find((p) => p.slug !== 'portfolio')!
const otherNumber = String(projects.indexOf(other) + 1).padStart(2, '0')
const otherHref = other.links.case
  ? localizePath(other.links.case, locale)
  : `${pages.home[locale]}#${other.slug}`

const sections = [
  { id: 'architecture', title: b.architecture },
  { id: 'pipeline', title: b.pipeline },
  { id: 'iac', title: b.iacTitle },
  { id: 'operations', title: b.opsTitle },
  { id: 'from-aws', title: b.fromAwsTitle },
  { id: 'not-covered', title: b.notCoveredTitle },
]
</script>

<template>
  <SiteHeader page="build" :slug="project.slug" />
  <main id="top" class="case">
    <section class="wrap case-intro">
      <div class="case-title-row">
        <span class="d ol case-number" aria-hidden="true">{{ number }}</span>
        <div class="case-title">
          <p class="m case-tag">{{ project.status }}</p>
          <h1 class="d">{{ project.title }}</h1>
        </div>
      </div>

      <div class="case-intro-row">
        <div class="case-intro-text">
          <p class="case-lead"><RichText :text="b.lead" /></p>
          <a :href="project.links.repo" class="case-cta">
            {{ b.repo }}
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 11L11 5M5.5 5H11v5.5" />
            </svg>
          </a>
        </div>
        <dl class="m case-facts">
          <div>
            <dt>{{ b.status }}</dt>
            <dd class="status"><StatusLine /></dd>
          </div>
          <div v-for="fact in b.facts" :key="fact.label">
            <dt>{{ fact.label }}</dt>
            <dd>{{ fact.value }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <div class="wrap case-content">
      <nav class="m case-toc" :aria-label="b.toc">
        <ol>
          <li v-for="(s, i) in sections" :key="s.id">
            <a :href="`#${s.id}`"
              ><span class="num">{{ i + 1 }}</span> {{ s.title }}</a
            >
          </li>
        </ol>
      </nav>

      <div class="case-sections">
        <section :id="sections[0]!.id" class="case-section" aria-labelledby="architecture-title">
          <h2 id="architecture-title"><span class="m">1</span>{{ b.architecture }}</h2>
          <ArchitectureDiagram />
        </section>

        <section :id="sections[1]!.id" class="case-section" aria-labelledby="pipeline-title">
          <h2 id="pipeline-title"><span class="m">2</span>{{ b.pipeline }}</h2>
          <p>{{ b.pipelineText }}</p>
          <CiLog v-for="w in b.workflows" :key="w.file" v-bind="w" />
        </section>

        <section :id="sections[2]!.id" class="case-section" aria-labelledby="iac-title">
          <h2 id="iac-title"><span class="m">3</span>{{ b.iacTitle }}</h2>
          <p><RichText :text="b.iacText" /></p>
          <ul class="case-items">
            <li v-for="item in b.iacItems" :key="item">
              <span class="m plus" aria-hidden="true">+</span><span><RichText :text="item" /></span>
            </li>
          </ul>
        </section>

        <section :id="sections[3]!.id" class="case-section" aria-labelledby="operations-title">
          <h2 id="operations-title"><span class="m">4</span>{{ b.opsTitle }}</h2>
          <p><RichText :text="b.opsText" /></p>
          <StatusSummary />
        </section>

        <section :id="sections[4]!.id" class="case-section" aria-labelledby="from-aws-title">
          <h2 id="from-aws-title"><span class="m">5</span>{{ b.fromAwsTitle }}</h2>
          <p><RichText :text="b.fromAwsText" /></p>
        </section>

        <section :id="sections[5]!.id" class="case-section" aria-labelledby="not-covered-title">
          <h2 id="not-covered-title"><span class="m">6</span>{{ b.notCoveredTitle }}</h2>
          <p><RichText :text="b.notCoveredText" /></p>
        </section>
      </div>
    </div>

    <nav class="case-other" :aria-label="b.other">
      <a :href="otherHref" class="wrap">
        <span class="m muted"
          ><span class="num">{{ otherNumber }}</span> · {{ b.other }}</span
        >
        <span class="dc">{{ other.title }}</span>
      </a>
    </nav>
  </main>
  <SiteFooter />
</template>

<style scoped>
/* The status line is mono already; keep it the same size as the other values. */
.status :deep(.status-line) {
  font-size: inherit;
  justify-content: flex-end;
}
</style>
