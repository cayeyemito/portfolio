<script setup lang="ts">
import ArchitectureDiagram from '@/components/ArchitectureDiagram.vue'
import CiLog from '@/components/CiLog.vue'
import RichText from '@/components/RichText.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import StatusLine from '@/components/StatusLine.vue'
import StatusSummary from '@/components/StatusSummary.vue'
import { pages, useLocale, useMessages } from '@/i18n'
import { projectsFor } from '@/lib/projects'

// Case page of the portfolio project (02), laid out like every case page.
const locale = useLocale()
const m = useMessages()
const b = m.build
const projects = projectsFor(locale)
const index = projects.findIndex((p) => p.slug === 'portfolio')
const project = projects[index]!
const number = String(index + 1).padStart(2, '0')
// The other project, linked at the bottom (on the home page until it has a case page).
const other = projects.find((p) => p.slug !== 'portfolio')!
const otherNumber = String(projects.indexOf(other) + 1).padStart(2, '0')

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
  <main id="top">
    <section class="wrap intro">
      <div class="title-row">
        <span class="d ol big-number" aria-hidden="true">{{ number }}</span>
        <div class="title">
          <p class="m tag">{{ project.status }}</p>
          <h1 class="d">{{ project.title }}</h1>
        </div>
      </div>

      <div class="intro-row">
        <div class="intro-text">
          <p class="lead"><RichText :text="b.lead" /></p>
          <a :href="project.links.repo" class="cta">
            {{ b.repo }}
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 11L11 5M5.5 5H11v5.5" />
            </svg>
          </a>
        </div>
        <dl class="m facts">
          <div>
            <dt>{{ b.status }}</dt>
            <dd><StatusLine /></dd>
          </div>
          <div v-for="fact in b.facts" :key="fact.label">
            <dt>{{ fact.label }}</dt>
            <dd>{{ fact.value }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <div class="wrap content">
      <nav class="m toc" :aria-label="b.toc">
        <ol>
          <li v-for="(s, i) in sections" :key="s.id">
            <a :href="`#${s.id}`"
              ><span class="toc-num">{{ i + 1 }}</span> {{ s.title }}</a
            >
          </li>
        </ol>
      </nav>

      <div class="sections">
        <section :id="sections[0]!.id" aria-labelledby="architecture-title">
          <h2 id="architecture-title"><span class="m">1</span>{{ b.architecture }}</h2>
          <ArchitectureDiagram />
        </section>

        <section :id="sections[1]!.id" aria-labelledby="pipeline-title">
          <h2 id="pipeline-title"><span class="m">2</span>{{ b.pipeline }}</h2>
          <p>{{ b.pipelineText }}</p>
          <CiLog v-for="w in b.workflows" :key="w.file" v-bind="w" />
        </section>

        <section :id="sections[2]!.id" aria-labelledby="iac-title">
          <h2 id="iac-title"><span class="m">3</span>{{ b.iacTitle }}</h2>
          <p><RichText :text="b.iacText" /></p>
          <ul class="items">
            <li v-for="item in b.iacItems" :key="item">
              <span class="m plus" aria-hidden="true">+</span><span><RichText :text="item" /></span>
            </li>
          </ul>
        </section>

        <section :id="sections[3]!.id" aria-labelledby="operations-title">
          <h2 id="operations-title"><span class="m">4</span>{{ b.opsTitle }}</h2>
          <p><RichText :text="b.opsText" /></p>
          <StatusSummary />
        </section>

        <section :id="sections[4]!.id" aria-labelledby="from-aws-title">
          <h2 id="from-aws-title"><span class="m">5</span>{{ b.fromAwsTitle }}</h2>
          <p><RichText :text="b.fromAwsText" /></p>
        </section>

        <section :id="sections[5]!.id" aria-labelledby="not-covered-title">
          <h2 id="not-covered-title"><span class="m">6</span>{{ b.notCoveredTitle }}</h2>
          <p><RichText :text="b.notCoveredText" /></p>
        </section>
      </div>
    </div>

    <nav class="other" :aria-label="b.other">
      <a :href="`${pages.home[locale]}#${other.slug}`" class="wrap other-link">
        <span class="m muted"
          ><span class="num">{{ otherNumber }}</span> · {{ b.other }}</span
        >
        <span class="dc other-title">{{ other.title }}</span>
      </a>
    </nav>
  </main>
  <SiteFooter />
</template>

<style scoped>
svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}

/* Intro */
.intro {
  padding-top: 72px;
  padding-bottom: 64px;
}

.title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 32px 56px;
}

/* Decorative: smaller on phones so the title is not pushed down a whole screen. */
.big-number {
  -webkit-text-stroke: 2px var(--atext);
  font-size: clamp(72px, 20vw, 300px);
  line-height: 0.8;
}

.title {
  flex: 1 1 520px;
  min-width: 0;
}

.tag {
  display: inline-block;
  margin: 0 0 18px;
  padding: 4px 8px;
  border: 1px solid var(--rule3);
}

h1 {
  font-size: clamp(56px, 9vw, 140px);
  line-height: 0.88;
  letter-spacing: -0.035em;
}

.intro-row {
  display: flex;
  flex-wrap: wrap;
  gap: 40px 64px;
  margin-top: 64px;
}

.intro-text {
  flex: 999 1 520px;
  min-width: 0;
}

.lead {
  max-width: 760px;
  margin: 0;
  font-size: clamp(20px, 2vw, 26px);
  font-weight: 500;
  line-height: 1.4;
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  min-height: 52px;
  margin-top: 32px;
  padding: 0 20px;
  background: var(--accent);
  color: var(--on-accent);
  font-family: var(--display);
  font-size: 18px;
  font-stretch: 112%;
  font-weight: 700;
  text-decoration: none;
}

.cta svg {
  stroke-width: 1.75;
}

.facts {
  flex: 1 1 360px;
  margin: 0;
  border-top: 1px solid var(--fg);
}

.facts div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 11px 0;
  border-bottom: 1px solid var(--rule);
}

.facts dt {
  flex-shrink: 0;
  color: var(--muted);
}

.facts dd {
  margin: 0;
  text-align: right;
}

/* The status line is mono already; keep it the same size as the other values. */
.facts dd :deep(.status-line) {
  font-size: inherit;
  justify-content: flex-end;
}

/* Contents: a table of contents on the left, the sections on the right. */
.content {
  display: flex;
  flex-wrap: wrap;
  gap: 48px 72px;
  padding-top: 32px;
}

.toc {
  flex: 1 1 200px;
}

.toc ol {
  position: sticky;
  top: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
  border-left: 1px solid var(--rule);
}

.toc a {
  display: block;
  margin-left: -1px;
  padding: 8px 14px;
  border-left: 2px solid transparent;
  color: var(--muted);
  text-decoration: none;
  transition:
    color 150ms var(--ease),
    border-color 150ms var(--ease);
}

.toc a:hover {
  border-left-color: var(--atext);
  color: var(--fg);
}

.toc-num {
  color: var(--atext);
}

.sections {
  flex: 999 1 640px;
  min-width: 0;
}

section {
  padding-bottom: 88px;
}

section > h2 {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 28px;
  font-size: clamp(32px, 3.4vw, 52px);
  letter-spacing: -0.035em;
  line-height: 0.95;
}

section > h2 .m {
  color: var(--atext);
}

section > p,
.items {
  max-width: 680px;
}

section > * + * {
  margin-top: 20px;
}

section > h2 + * {
  margin-top: 0;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  list-style: none;
}

.items li {
  display: flex;
  gap: 12px;
}

.plus {
  color: var(--muted);
}

/* Other project */
.other {
  border-top: 1px solid var(--rule);
}

.other-link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding-block: 48px;
  text-decoration: none;
}

.other .num {
  color: var(--atext);
}

.other-title {
  font-size: clamp(36px, 4vw, 60px);
}
</style>
