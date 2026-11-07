<script setup lang="ts">
import '@/styles/case.css'
import RichText from '@/components/RichText.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { localizePath, useLocale, useMessages } from '@/i18n'
import { projectsFor } from '@/lib/projects'

// Case page of Frimee (01). Layout in styles/case.css, shared with the portfolio case.
const locale = useLocale()
const m = useMessages()
const f = m.frimee
const a = f.architecture
const projects = projectsFor(locale)
const index = projects.findIndex((p) => p.slug === 'frimee')
const project = projects[index]!
const number = String(index + 1).padStart(2, '0')
// Design credit and start year, under "My part".
const credits = project.facts.map((fact) => `${fact.label}: ${fact.value}`).join(' · ')
const other = projects.find((p) => p.slug !== 'frimee')!
const otherNumber = String(projects.indexOf(other) + 1).padStart(2, '0')

const sections = [
  { id: 'context', title: f.contextTitle },
  { id: 'architecture', title: f.architectureTitle },
  { id: 'decisions', title: f.decisionsTitle },
  { id: 'challenge', title: f.challengeTitle },
  { id: 'lessons', title: f.learningsTitle },
]

// From src/app/api/directions/route.ts in the Frimee repository (commit 5d73025 added the
// Bearer fallback to every route). Verbatim, so it is not translated.
const code = [
  'export async function POST(req: NextRequest) {',
  '  // Try cookie-based auth first, then Bearer token fallback (browser client uses localStorage)',
  '  let user = null;',
  '  const authHeader = req.headers.get("authorization");',
  '  if (authHeader?.startsWith("Bearer ")) {',
  '    const token = authHeader.slice(7);',
  '    const supabase = createSupabaseServiceClient();',
  '    const { data } = await supabase.auth.getUser(token);',
  '    user = data.user;',
  '  } else {',
  '    const authClient = await createSupabaseServerClient();',
  '    const { data } = await authClient.auth.getUser();',
  '    user = data.user;',
  '  }',
  '  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });',
]
const highlighted = 8
</script>

<template>
  <SiteHeader page="frimee" :slug="project.slug" />
  <main id="top" class="case">
    <section class="wrap case-intro">
      <div class="case-title-row">
        <span class="d ol case-number" aria-hidden="true">{{ number }}</span>
        <div class="case-title">
          <p class="m case-tag live">
            <span class="square" aria-hidden="true"></span>{{ project.status }}
          </p>
          <h1 class="d">{{ project.title }}</h1>
        </div>
      </div>

      <div class="case-intro-row">
        <div class="case-intro-text">
          <p class="case-lead">{{ project.summary }}</p>
          <div class="part">
            <p class="m muted">{{ m.projects.part }}</p>
            <p>{{ project.part }}</p>
            <p v-if="credits" class="muted">{{ credits }}</p>
          </div>
          <a :href="project.links.demo" class="case-cta">
            {{ f.open }}
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 11L11 5M5.5 5H11v5.5" />
            </svg>
          </a>
        </div>
        <dl class="m case-facts">
          <div v-for="fact in f.facts" :key="fact.label">
            <dt>{{ fact.label }}</dt>
            <dd>
              <a v-if="fact.value === 'frimee.es'" :href="project.links.demo">{{ fact.value }}</a>
              <template v-else>{{ fact.value }}</template>
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <figure v-if="project.image" class="wrap shot">
      <img
        :src="project.image.src"
        :alt="project.image.alt"
        :width="project.image.width"
        :height="project.image.height"
      />
      <figcaption class="case-note">{{ f.imageCaption }}</figcaption>
    </figure>

    <div class="wrap case-content">
      <nav class="m case-toc" :aria-label="f.toc">
        <ol>
          <li v-for="(s, i) in sections" :key="s.id">
            <a :href="`#${s.id}`"
              ><span class="num">{{ i + 1 }}</span> {{ s.title }}</a
            >
          </li>
        </ol>
      </nav>

      <div class="case-sections">
        <section id="context" class="case-section" aria-labelledby="context-title">
          <h2 id="context-title"><span class="m">1</span>{{ f.contextTitle }}</h2>
          <p v-for="text in f.context" :key="text">{{ text }}</p>
          <h3 class="m muted features-title">{{ f.featuresTitle }}</h3>
          <ul class="case-rows features">
            <li v-for="feature in f.features" :key="feature.name">
              <p class="key">
                <strong>{{ feature.name }}</strong>
              </p>
              <p class="value body">{{ feature.text }}</p>
            </li>
          </ul>
        </section>

        <section id="architecture" class="case-section" aria-labelledby="architecture-title">
          <h2 id="architecture-title"><span class="m">2</span>{{ f.architectureTitle }}</h2>
          <figure class="system">
            <figcaption class="m muted">{{ a.caption }}</figcaption>
            <div class="system-row">
              <div class="clients">
                <p class="m muted">{{ a.clients }}</p>
                <div class="box">
                  <p>{{ a.web }}</p>
                  <p class="case-sub">{{ a.browser }}</p>
                </div>
                <div class="box">
                  <p>{{ a.app }}</p>
                  <p class="case-sub">Capacitor</p>
                </div>
              </div>

              <div class="paths">
                <div class="path">
                  <p class="path-head">
                    <svg width="40" height="10" viewBox="0 0 40 10" aria-hidden="true">
                      <path d="M0 5h38M34 1l4 4-4 4" />
                    </svg>
                    <span class="m">{{ a.direct }}</span>
                    <span class="muted">{{ a.directNote }} (<code>NEXT_PUBLIC_*</code>)</span>
                  </p>
                  <div class="grid">
                    <div class="box">
                      <p>Supabase</p>
                      <p class="case-sub">{{ a.boxes.supabase }}</p>
                    </div>
                    <div class="box">
                      <p>Firebase</p>
                      <p class="case-sub">{{ a.boxes.firebase }}</p>
                    </div>
                    <div class="box">
                      <p>LiveKit</p>
                      <p class="case-sub">{{ a.boxes.livekit }}</p>
                    </div>
                    <div class="box soft">
                      <p>Google Maps</p>
                      <p class="case-sub">{{ a.boxes.maps }}</p>
                    </div>
                  </div>
                </div>

                <div class="path strong">
                  <p class="path-head">
                    <svg width="40" height="10" viewBox="0 0 40 10" aria-hidden="true">
                      <path d="M0 5h38M34 1l4 4-4 4" />
                    </svg>
                    <span class="m">{{ a.server }}</span>
                    <span class="muted">{{ a.serverNote }}</span>
                  </p>
                  <div class="chain">
                    <div class="box api">
                      <p>Next.js · <code>/api</code></p>
                      <p class="case-sub">{{ a.boxes.api }}</p>
                    </div>
                    <svg
                      class="arrow"
                      width="28"
                      height="10"
                      viewBox="0 0 28 10"
                      aria-hidden="true"
                    >
                      <path d="M0 5h26M22 1l4 4-4 4" />
                    </svg>
                    <div class="grid">
                      <div class="box soft">
                        <p>LiveKit</p>
                        <p class="case-sub">{{ a.boxes.token }}</p>
                      </div>
                      <div class="box soft">
                        <p>Supabase</p>
                        <p class="case-sub">{{ a.boxes.serviceKey }}</p>
                      </div>
                      <div class="box soft">
                        <p>OpenAI</p>
                        <p class="case-sub">{{ a.boxes.ocr }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="path">
                  <p class="path-head">
                    <svg width="40" height="10" viewBox="0 0 40 10" aria-hidden="true">
                      <path d="M0 5h38M34 1l4 4-4 4" />
                    </svg>
                    <span class="m">{{ a.functions }}</span>
                    <span class="muted">{{ a.functionsNote }}</span>
                  </p>
                  <div class="grid">
                    <div class="box soft">
                      <p>Claude Haiku</p>
                      <p class="case-sub">{{ a.boxes.assistant }}</p>
                    </div>
                    <div class="box soft">
                      <p>Firebase FCM</p>
                      <p class="case-sub">{{ a.boxes.push }}</p>
                    </div>
                    <div class="box soft">
                      <p>Firestore</p>
                      <p class="case-sub">{{ a.boxes.sync }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p class="band dashed">
              <strong>Sentry</strong><span class="body">{{ a.sentry }}</span>
            </p>
            <p class="band">
              <strong>Hostinger</strong><span class="body">{{ a.hosting }}</span>
            </p>
          </figure>
          <p class="case-note">{{ f.architectureNote }}</p>
        </section>

        <section id="decisions" class="case-section" aria-labelledby="decisions-title">
          <h2 id="decisions-title"><span class="m">3</span>{{ f.decisionsTitle }}</h2>
          <ul class="case-rows">
            <li v-for="d in f.decisions" :key="d.name">
              <p class="key">
                <strong>{{ d.name }}</strong
                ><span class="case-sub">{{ d.note }}</span>
              </p>
              <div class="value">
                <p><RichText :text="d.what" /></p>
                <p v-if="d.why" class="why">
                  <span class="m">{{ f.why }}</span> <RichText :text="d.why" />
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section id="challenge" class="case-section" aria-labelledby="challenge-title">
          <h2 id="challenge-title"><span class="m">4</span>{{ f.challengeTitle }}</h2>
          <h3 class="challenge-title">{{ f.challenge.title }}</h3>
          <p v-for="text in f.challenge.text" :key="text"><RichText :text="text" /></p>
          <figure class="code">
            <figcaption class="m">
              <span class="file">src/app/api/directions/route.ts</span><span>commit 5d73025</span>
            </figcaption>
            <div class="code-scroll">
              <pre><code><span v-for="(line, i) in code" :key="i" :class="['line', { hl: i + 1 === highlighted }]"><i>{{ i + 1 }}</i>{{ line }}</span></code></pre>
            </div>
          </figure>
          <p class="case-note">{{ f.challenge.codeNote }}</p>
        </section>

        <section id="lessons" class="case-section" aria-labelledby="lessons-title">
          <h2 id="lessons-title"><span class="m">5</span>{{ f.learningsTitle }}</h2>
          <ol class="case-rows">
            <li v-for="l in f.learnings" :key="l.name">
              <p class="key">
                <strong>{{ l.name }}</strong>
              </p>
              <p class="value"><RichText :text="l.text" /></p>
            </li>
          </ol>
        </section>
      </div>
    </div>

    <nav class="case-other" :aria-label="f.other">
      <a :href="localizePath(other.links.case!, locale)" class="wrap">
        <span class="m muted"
          ><span class="num">{{ otherNumber }}</span> · {{ f.other }} →</span
        >
        <span class="dc">{{ other.title }}</span>
      </a>
    </nav>
  </main>
  <SiteFooter />
</template>

<style scoped>
.part {
  max-width: 760px;
  margin-top: 28px;
  padding: 4px 0 4px 20px;
  border-left: 2px solid var(--atext);
}

.part p {
  margin: 0;
}

.part p + p {
  margin-top: 8px;
}

.shot {
  margin-block: 0;
}

.shot img {
  width: 100%;
  border: 1px solid var(--rule2);
  background: var(--panel);
}

.shot figcaption {
  margin-top: 12px;
}

.body {
  color: var(--body);
}

.features-title {
  margin-top: 36px;
  font: inherit;
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.06em;
}

.features > li {
  padding: 14px 0;
}

.features .key {
  flex-basis: 200px;
}

/* Architecture: boxes in three paths, from the clients to the services. */
.system {
  margin: 0;
  padding: clamp(20px, 3vw, 40px);
  border: 1px solid var(--rule2);
  background: var(--panel);
}

.system figcaption {
  margin-bottom: 28px;
}

.system p {
  margin: 0;
}

.system-row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 20px 24px;
}

.clients {
  flex: 1 1 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.paths {
  flex: 999 1 460px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.path {
  padding: 16px;
  border: 1px solid var(--rule2);
}

.path.strong {
  border-color: var(--fg);
}

.path-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 14px;
  margin-bottom: 14px !important;
  font-size: 15px;
}

.path-head svg,
.arrow {
  color: var(--muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
  gap: 10px;
}

.chain {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.chain .api {
  flex: 1 1 200px;
}

.chain .grid {
  flex: 2 1 280px;
}

.box {
  padding: 12px;
  border: 1px solid var(--fg);
  background: var(--bg);
}

.box.soft {
  border-color: var(--rule3);
}

.box > p:first-child {
  font-weight: 500;
}

.band {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 16px;
  margin-top: 12px !important;
  padding: 14px 16px;
  border: 1px solid var(--rule2);
}

.band.dashed {
  margin-top: 16px !important;
  border-style: dashed;
  border-color: var(--rule3);
}

/* Decisions: the fact first, the reason after it. */
.why {
  color: var(--body);
}

.why .m {
  color: var(--atext);
}

/* Challenge: the code stays dark in both themes, like an editor. */
.challenge-title {
  font-family: var(--font);
  font-size: 22px;
  font-stretch: normal;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.code {
  margin-inline: 0;
  border: 1px solid #2a2a2e;
  background: #0f0f11;
  color: #d8d6d0;
}

.code figcaption {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 12px;
  padding: 10px 16px;
  border-bottom: 1px solid #2a2a2e;
  color: #a8a6a0;
}

.code .file {
  text-transform: none;
}

.code-scroll {
  overflow-x: auto;
}

pre {
  margin: 0;
  padding: 20px 0;
  font-family: var(--mono);
  font-size: 14px;
  line-height: 1.75;
}

pre code {
  font-size: inherit;
}

.line {
  display: block;
  padding-right: 24px;
  white-space: pre;
}

.line i {
  display: inline-block;
  width: 48px;
  padding-right: 20px;
  color: #8a8a90;
  font-style: normal;
  text-align: right;
  user-select: none;
}

.line.hl {
  background: rgb(255 77 31 / 0.12);
  box-shadow: inset 2px 0 0 var(--accent);
}

.line.hl i {
  color: var(--accent);
}
</style>
