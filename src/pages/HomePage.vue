<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import RichText from '@/components/RichText.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import WorkflowsFigure from '@/components/WorkflowsFigure.vue'
import { profile } from '@/data/profile'
import { useLocale, useMessages } from '@/i18n'
import { projectsFor } from '@/lib/projects'

const locale = useLocale()
const m = useMessages()
const projects = projectsFor(locale)
const number = (i: number) => String(i + 1).padStart(2, '0')

// Copy the email: the button says "Copied" for a moment and a live region announces it.
const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
  } catch {
    // No clipboard access (old browser, insecure context): the mailto link is still there.
    return
  }
  copied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => (copied.value = false), 1800)
}

onBeforeUnmount(() => clearTimeout(copiedTimer))
</script>

<template>
  <SiteHeader page="home" />
  <main>
    <section id="top" class="wrap hero" :aria-label="profile.name">
      <p class="m focus">{{ m.profile.focus }}</p>
      <h1>
        <span class="d first">{{ profile.firstName }}</span>
        <span class="dc ol surnames">{{ profile.surnames }}</span>
      </h1>

      <div class="hero-row">
        <div class="hero-text">
          <p class="intro"><RichText :text="m.profile.intro" /></p>
          <ul class="tags m">
            <li v-for="tag in m.profile.tags" :key="tag">{{ tag }}</li>
          </ul>
        </div>
        <div class="hero-side">
          <p class="m available">
            <span class="square" aria-hidden="true"></span>{{ m.profile.available }}
          </p>
          <dl class="languages">
            <div v-for="lang in m.profile.languages" :key="lang.name">
              <dt class="m">{{ lang.name }}</dt>
              <dd>{{ lang.level }}</dd>
            </div>
          </dl>
          <div class="cvs">
            <a
              v-for="(cv, i) in m.cvs"
              :key="cv.href"
              :href="cv.href"
              :class="['cv', { primary: i === 0 }]"
              download
            >
              <span>CV · {{ cv.label }}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 2v9M4 7.5l4 4 4-4M3 14h10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" class="projects" aria-labelledby="projects-title">
      <div class="wrap">
        <div class="section-head">
          <h2 id="projects-title">
            <span class="m num">01 /</span><span>{{ m.projects.title }}</span>
          </h2>
          <p class="m">{{ m.projects.path }}</p>
        </div>
        <template v-for="(p, i) in projects" :key="p.slug">
          <ProjectCard :project="p" :number="number(i)" :featured="i === 0">
            <template v-if="p.slug === 'portfolio'" #media>
              <WorkflowsFigure />
            </template>
          </ProjectCard>
        </template>
      </div>
    </section>

    <section id="experience" class="experience" aria-labelledby="experience-title">
      <div class="wrap">
        <div class="section-head">
          <h2 id="experience-title">
            <span class="m num">02 /</span><span>{{ m.home.experienceTitle }}</span>
          </h2>
          <p class="m">{{ m.home.experiencePath }}</p>
        </div>
        <ol class="log">
          <li v-for="(job, i) in m.experience" :key="job.company" class="entry">
            <div class="m when">
              <span class="period">
                <span :class="['marker', { current: i === 0 }]" aria-hidden="true"></span>
                {{ job.period }}
              </span>
              <span class="muted">{{ job.kind }}</span>
            </div>
            <div class="what">
              <h3>
                <span class="d company">{{ job.company }}</span>
                <span class="m role">{{ job.role }}</span>
              </h3>
              <ul class="points">
                <li v-for="point in job.points" :key="point">
                  <span class="m plus" aria-hidden="true">+</span><span>{{ point }}</span>
                </li>
              </ul>
            </div>
          </li>
          <li class="entry education">
            <div class="m when muted">{{ m.education.title }}</div>
            <dl class="what studies">
              <div v-for="item in m.education.items" :key="item.name">
                <dt class="m muted">{{ item.period }}</dt>
                <dd>{{ item.name }}</dd>
              </div>
            </dl>
          </li>
        </ol>
      </div>
    </section>

    <section id="stack" class="stack" aria-labelledby="stack-title">
      <div class="wrap">
        <div class="section-head">
          <h2 id="stack-title">
            <span class="m num">03 /</span><span>{{ m.home.stackTitle }}</span>
          </h2>
          <p class="m">{{ m.home.stackNote }}</p>
        </div>
        <div class="groups">
          <div v-for="group in m.home.stack" :key="group.title" class="group">
            <h3 class="m">{{ group.title }}</h3>
            <ul>
              <li v-for="item in group.items" :key="item.name">
                <span class="tech"><RichText :text="item.name" /></span>
                <span class="m where">→ {{ item.where }}</span>
              </li>
            </ul>
          </div>
        </div>
        <p class="also">{{ m.home.stackAlso }}</p>
      </div>
    </section>

    <section id="contact" class="contact" aria-labelledby="contact-title">
      <div class="wrap">
        <p class="m contact-label">
          <span class="num">04 /</span> <span class="muted">{{ m.home.contactLabel }}</span>
        </p>
        <h2 id="contact-title" class="d">{{ m.home.contactTitle }}</h2>
        <div class="contact-row">
          <div class="email-block">
            <p class="m muted">{{ m.home.email }}</p>
            <div class="email-line">
              <a :href="`mailto:${profile.email}`" class="email">{{ profile.email }}</a>
              <button type="button" class="m copy" @click="copyEmail">
                <svg v-if="copied" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8.5l3.2 3L13 4.5" />
                </svg>
                <svg v-else width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <rect x="5" y="5" width="8.5" height="8.5" />
                  <path d="M3 10.5V2.5h8" />
                </svg>
                {{ copied ? m.home.copied : m.home.copy }}
              </button>
              <span class="vh" aria-live="polite">{{ copied ? m.home.copiedMessage : '' }}</span>
            </div>
          </div>
          <ul class="channels">
            <li>
              <a :href="profile.links.github">
                <span class="m muted">GitHub</span><span>github.com/cayeyemito</span>
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M5 11L11 5M5.5 5H11v5.5" />
                </svg>
              </a>
            </li>
            <li>
              <a :href="profile.links.linkedin">
                <span class="m muted">LinkedIn</span><span>in/cayetano-yeste-morant</span>
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M5 11L11 5M5.5 5H11v5.5" />
                </svg>
              </a>
            </li>
            <li v-for="cv in m.cvs" :key="cv.href">
              <a :href="cv.href" download>
                <span class="m muted">CV</span><span>{{ cv.label }}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 2v9M4 7.5l4 4 4-4M3 14h10" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>

<style scoped>
svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}

/* Hero */
.hero {
  padding-top: clamp(36px, 4.5vw, 64px);
  padding-bottom: 80px;
}

.focus {
  margin: 0 0 18px;
  color: var(--muted);
}

h1 {
  font: inherit;
  letter-spacing: normal;
}

.first {
  display: block;
  font-size: clamp(52px, 10.6vw, 156px);
}

.surnames {
  display: block;
  margin-top: 4px;
  padding-left: clamp(0px, 8vw, 128px);
  font-size: clamp(60px, 12.6vw, 188px);
}

.hero-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 40px 64px;
  margin-top: clamp(36px, 4vw, 56px);
}

.hero-text {
  flex: 999 1 520px;
  min-width: 0;
}

.intro {
  max-width: 700px;
  margin: 0;
  color: var(--body);
  font-size: clamp(21px, 2.1vw, 29px);
  line-height: 1.32;
  letter-spacing: -0.01em;
}

/* RichText's *emphasis* is the highlighted part of the intro. */
.intro :deep(em) {
  font-style: normal;
  font-weight: 600;
  color: var(--fg-strong);
}

.hero-text .tags {
  margin-top: 24px;
}

.hero-side {
  flex: 1 1 340px;
  min-width: 0;
}

.available {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 14px;
}

.square {
  width: 8px;
  height: 8px;
  background: var(--accent);
}

.languages {
  margin: 0 0 16px;
  border-top: 1px solid var(--fg);
}

.languages div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid var(--rule);
}

.languages dt {
  color: var(--muted);
}

.languages dd {
  margin: 0;
}

.cvs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cv {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 52px;
  padding: 0 16px;
  border: 1px solid var(--rule3);
  font-weight: 500;
  text-decoration: none;
  transition: filter 150ms var(--ease);
}

.cv.primary {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--on-accent);
  font-weight: 600;
}

.cv:hover {
  filter: brightness(1.08);
}

/* Projects */
.projects {
  border-top: 1px solid var(--rule);
}

.projects > .wrap {
  padding-bottom: 128px;
}

.section-head {
  border-bottom-color: var(--fg);
}

/* Experience */
.experience {
  border-top: 1px solid var(--fg);
  background: var(--bg-alt);
}

.experience > .wrap {
  padding-bottom: 120px;
}

.log {
  margin: 0;
  padding: 0;
  list-style: none;
}

.entry {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 48px;
  padding: 44px 0;
  border-bottom: 1px solid var(--rule);
}

.entry:nth-last-child(2) {
  border-bottom: 0;
}

.when {
  flex: 0 0 240px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.period {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.marker {
  width: 10px;
  height: 10px;
  border: 1px solid var(--fg);
}

.marker.current {
  background: var(--fg);
}

.what {
  flex: 1 1 480px;
  min-width: 0;
}

.entry h3 {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 18px;
  font: inherit;
  letter-spacing: normal;
}

.company {
  font-size: clamp(28px, 2.8vw, 40px);
}

.role {
  color: var(--muted);
}

.points {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.points li {
  display: flex;
  gap: 12px;
}

.plus {
  color: var(--muted);
}

.education {
  padding-bottom: 0;
  border-top: 1px solid var(--fg);
  border-bottom: 0;
}

.studies {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 64px;
  margin: 0;
}

.studies dd {
  margin: 6px 0 0;
  font-weight: 500;
}

/* Stack: the inverted section */
.stack {
  background: var(--ibg);
  color: var(--ifg);
}

.stack > .wrap {
  padding-bottom: 120px;
}

.stack .section-head {
  border-bottom-color: var(--ifg);
}

.stack .num {
  color: var(--iaccent);
}

.stack .section-head p,
.stack .where,
.stack .also,
.group h3 {
  color: var(--imuted);
}

.groups {
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  margin-top: 56px;
}

.group {
  flex: 1 1 280px;
  min-width: 0;
  padding-top: 14px;
  border-top: 2px solid var(--ifg);
}

/* Reset the global heading style; .m (mono label) then applies as in the design. */
.group h3 {
  margin: 0 0 12px;
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 400;
  font-stretch: normal;
  letter-spacing: 0.06em;
  line-height: inherit;
}

.group ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.group li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--irule);
}

.tech {
  font-weight: 500;
}

.tech :deep(em) {
  font-style: normal;
  font-weight: 600;
}

.where {
  white-space: nowrap;
}

.also {
  margin: 32px 0 0;
  font-size: 15px;
}

/* Contact */
.contact-label {
  margin: 0;
  padding-top: 104px;
}

.contact-label .num {
  color: var(--atext);
}

#contact-title {
  margin-top: 24px;
  font-size: clamp(44px, 11vw, 168px);
  overflow-wrap: anywhere;
}

.contact-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 48px 64px;
  margin-top: 56px;
  padding-bottom: 104px;
}

.email-block {
  flex: 999 1 480px;
  min-width: 0;
}

.email-block > p {
  margin: 0 0 12px;
}

.email-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 24px;
}

.email {
  font-family: var(--display);
  font-size: clamp(22px, 3vw, 40px);
  font-weight: 700;
  letter-spacing: -0.01em;
  overflow-wrap: anywhere;
}

.copy {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 0 16px;
  border: 0;
  background: var(--accent);
  color: var(--on-accent);
  cursor: pointer;
}

.copy svg {
  stroke-width: 1.75;
}

.channels {
  flex: 1 1 380px;
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--fg);
}

.channels li {
  border-bottom: 1px solid var(--rule);
}

.channels a {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr) 16px;
  align-items: center;
  gap: 16px;
  min-height: 44px;
  padding: 16px 0;
  text-decoration: none;
}
</style>
