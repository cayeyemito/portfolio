<script setup lang="ts">
import { localizePath, useLocale, useMessages } from '@/i18n'
import { demoLabel, type Project } from '@/lib/projects'

// featured: media first and a big title (the main project). Otherwise the text comes
// first and the media (the #media slot, or the project image) sits beside it.
defineProps<{ project: Project; number: string; featured?: boolean }>()

const locale = useLocale()
const m = useMessages()
</script>

<template>
  <article :id="project.slug" :class="['project', { featured }]">
    <div class="media">
      <slot name="media">
        <img
          v-if="project.image"
          :src="project.image.src"
          :alt="project.image.alt"
          :width="project.image.width"
          :height="project.image.height"
          loading="lazy"
        />
      </slot>
    </div>

    <div class="body">
      <div class="meta">
        <p class="m path">
          <span class="number">{{ number }}</span> · ~/work/{{ project.slug }}
        </p>
        <span :class="['m', 'status', { live: featured }]">
          <span v-if="featured" class="square" aria-hidden="true"></span>{{ project.status }}
        </span>
      </div>
      <h3 class="d">{{ project.title }}</h3>
      <p class="summary">{{ project.summary }}</p>

      <dl v-if="project.part || project.facts.length" class="details">
        <div v-if="project.part" class="row">
          <dt class="m">{{ m.projects.part }}</dt>
          <dd>{{ project.part }}</dd>
        </div>
        <div v-if="project.facts.length" class="row facts">
          <div v-for="fact in project.facts" :key="fact.label">
            <dt class="m">{{ fact.label }}</dt>
            <dd>{{ fact.value }}</dd>
          </div>
        </div>
      </dl>

      <ul class="tags m" aria-label="Stack">
        <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
      </ul>

      <div class="links">
        <a v-if="project.links.case" :href="localizePath(project.links.case, locale)">
          {{ m.projects.caseStudy }}
          <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2 8h12M9.5 3.5L14 8l-4.5 4.5" />
          </svg>
        </a>
        <a v-if="project.links.demo" :href="project.links.demo">
          {{ demoLabel(project.links.demo) }}
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M5 11L11 5M5.5 5H11v5.5" />
          </svg>
        </a>
        <a v-if="project.links.repo" :href="project.links.repo">
          {{ m.projects.repo }}
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M5 11L11 5M5.5 5H11v5.5" />
          </svg>
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project {
  display: flex;
  flex-wrap: wrap-reverse;
  gap: 40px 56px;
  padding: 72px 0 0;
}

.project.featured {
  flex-wrap: wrap;
  padding: 56px 0 72px;
  border-bottom: 1px solid var(--rule);
}

/* Side layout: text on the left, media on the right (above it when they wrap). */
.media {
  flex: 999 1 600px;
  min-width: 0;
  order: 2;
}

.body {
  flex: 1 1 360px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  order: 1;
}

.featured .media {
  flex-basis: 560px;
  order: 1;
}

.featured .body {
  flex-basis: 380px;
  order: 2;
}

.media img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  /* The screenshot is wider than 16:10: keep its left edge (the app's sidebar). */
  object-position: left top;
  border: 1px solid var(--rule2);
  background: var(--panel);
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.path {
  margin: 0;
  color: var(--muted);
}

.number {
  color: var(--fg);
}

.status {
  padding: 4px 8px;
  border: 1px solid var(--rule3);
  white-space: nowrap;
}

.status.live {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  border-color: var(--accent);
  background: var(--accent);
  color: var(--on-accent);
}

.square {
  width: 7px;
  height: 7px;
  background: var(--on-accent);
}

h3 {
  margin-top: 24px;
  font-size: clamp(32px, 3.2vw, 48px);
  line-height: 0.95;
}

.featured h3 {
  font-size: clamp(56px, 6vw, 92px);
  line-height: 0.88;
}

.summary {
  max-width: 520px;
  margin: 20px 0 0;
  color: var(--body);
}

.details {
  margin: 28px 0 0;
  border-top: 1px solid var(--rule);
}

.row {
  padding: 12px 0;
  border-bottom: 1px solid var(--rule);
}

.facts {
  display: flex;
  gap: 40px;
}

dt {
  color: var(--muted);
}

dd {
  margin: 6px 0 0;
}

.tags {
  margin-top: 18px;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 32px;
  margin-top: auto;
  padding-top: 32px;
}

.links a {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  font-weight: 500;
}

.links svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}
</style>
