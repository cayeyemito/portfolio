<script setup lang="ts">
import '@/styles/case.css'
import DemoVideo from '@/components/DemoVideo.vue'
import RichText from '@/components/RichText.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { localizePath, useLocale, useMessages } from '@/i18n'
import { projectsFor } from '@/lib/projects'
import { reactive } from 'vue'

// Case page of Frimee (01), in five blocks: what it is, what you find (a departures
// board as the index and the pieces as stops of an itinerary), how it works, how it was
// built and what it does not do yet. Shared intro styles in styles/case.css.
const locale = useLocale()
const m = useMessages()
const f = m.frimee
const a = f.architecture
const projects = projectsFor(locale)
const index = projects.findIndex((p) => p.slug === 'frimee')
const project = projects[index]!
const number = String(index + 1).padStart(2, '0')
const credits = project.facts.map((fact) => `${fact.label}: ${fact.value}`).join(' · ')
const other = projects.find((p) => p.slug !== 'frimee')!
const otherNumber = String(projects.indexOf(other) + 1).padStart(2, '0')

const pad = (n: number) => String(n).padStart(2, '0')

// Each piece can show its screenshot on the web or on the phone; the choice is per piece.
type Mode = 'web' | 'mobile'
const modes = (piece: (typeof f.pieces)[number]) =>
  (['web', 'mobile'] as const).filter((k) => piece.shots[k])
const chosen = reactive<Record<string, Mode>>({})
const current = (piece: (typeof f.pieces)[number]) => {
  const available = modes(piece)
  const pick = chosen[piece.id]
  return pick && available.includes(pick) ? pick : available[0]
}
const paths = [
  { kind: 'direct', title: a.direct, note: a.directNote, boxes: a.directBoxes },
  { kind: 'server', title: a.server, note: a.serverNote, boxes: a.serverBoxes },
  { kind: 'background', title: a.background, note: a.backgroundNote, boxes: a.backgroundBoxes },
] as const

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
  <main id="top" class="case frimee">
    <!-- 1 · What it is -->
    <section class="wrap case-intro" aria-labelledby="frimee-title">
      <div class="case-title-row">
        <span class="d ol case-number" aria-hidden="true">{{ number }}</span>
        <div class="case-title">
          <p class="m case-tag live">
            <span class="square" aria-hidden="true"></span>{{ project.status }}
          </p>
          <h1 id="frimee-title" class="d">{{ project.title }}</h1>
        </div>
      </div>

      <p class="lead">{{ f.lead }}</p>

      <div class="case-intro-row">
        <div class="case-intro-text">
          <div class="ctas">
            <a :href="f.guestHref" class="case-cta">
              {{ f.guestCta }}
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2 8h12M9.5 3.5L14 8l-4.5 4.5" />
              </svg>
            </a>
            <a :href="project.links.demo" class="cta2">
              {{ f.open }}
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5 11L11 5M5.5 5H11v5.5" />
              </svg>
            </a>
            <a href="https://landing.frimee.es" class="cta3">{{ f.landing }}</a>
          </div>
          <p class="guest">{{ f.guest }}</p>
          <div class="part">
            <p class="m muted">{{ m.projects.part }}</p>
            <p>{{ project.part }}</p>
            <p v-if="credits" class="muted">{{ credits }}</p>
          </div>
        </div>
        <dl class="m case-facts">
          <div v-for="fact in f.facts" :key="fact.label">
            <dt>{{ fact.label }}</dt>
            <dd>{{ fact.value }}</dd>
          </div>
          <div>
            <dt>{{ f.code }}</dt>
            <dd>
              <a :href="project.links.repo">FrimeeApp/Frimee</a>
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <figure class="wrap shot">
      <DemoVideo
        :src="m.projects.frimeeVideo.src"
        :poster="m.projects.frimeeVideo.poster"
        :width="1280"
        :height="800"
        :label="m.projects.frimeeVideo.label"
        :play-label="f.video.play"
        :pause-label="f.video.pause"
      />
      <figcaption class="case-note">{{ f.video.caption }}</figcaption>
    </figure>

    <!-- 2 · What you find -->
    <section class="wrap block" aria-labelledby="pieces-title">
      <h2 id="pieces-title" class="block-head">
        <span class="block-title"
          ><span class="m num">2 /</span><span class="d">{{ f.piecesTitle }}</span></span
        >
        <span class="m muted">{{ f.piecesNote }}</span>
      </h2>

      <nav class="fids" :aria-label="f.board.label">
        <div class="fids-top">
          <span class="fids-title">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" class="plane">
              <path
                d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"
              />
            </svg>
            {{ f.board.title
            }}<span v-if="f.board.subtitle" class="dim"> · {{ f.board.subtitle }}</span>
          </span>
          <span class="fids-sub">{{ f.board.terminal }}</span>
        </div>
        <p class="fids-head" aria-hidden="true">
          <span>{{ f.board.flight }}</span
          ><span>{{ f.board.destination }}</span
          ><span>{{ f.board.gate }}</span
          ><span></span>
        </p>
        <ol>
          <li v-for="(piece, i) in f.pieces" :key="piece.id">
            <a :href="`#${piece.id}`">
              <span class="flap">FRM{{ pad(i + 1) }}</span>
              <span class="flap dest">{{ piece.name }}</span>
              <span class="flap gate">{{ piece.gate }}</span>
              <span class="go" aria-hidden="true">→</span>
            </a>
          </li>
        </ol>
      </nav>

      <div class="stops">
        <article v-for="(piece, i) in f.pieces" :id="piece.id" :key="piece.id" class="stop">
          <span class="pin" aria-hidden="true">{{ pad(i + 1) }}</span>
          <div class="stop-main">
            <h3>
              <span class="vh">{{ f.board.stop }} {{ pad(i + 1) }}: </span>{{ piece.name }}
            </h3>
            <div v-if="modes(piece).length > 1" class="seg" role="group" :aria-label="f.viewLabel">
              <button
                v-for="k in modes(piece)"
                :key="k"
                type="button"
                class="m"
                :class="{ on: current(piece) === k }"
                :aria-pressed="current(piece) === k"
                @click="chosen[piece.id] = k"
              >
                {{ f.views[k] }}
              </button>
            </div>
            <template v-for="k in modes(piece)" :key="k">
              <img
                v-show="current(piece) === k"
                :src="piece.shots[k]!.src"
                :alt="piece.shots[k]!.alt"
                :width="piece.shots[k]!.width"
                :height="piece.shots[k]!.height"
                :class="{ phone: k === 'mobile' }"
                loading="lazy"
              />
            </template>
          </div>
          <div class="stop-see">
            <p class="m muted label">{{ f.see }}</p>
            <p v-for="text in piece.see" :key="text">{{ text }}</p>
          </div>
          <div class="stop-hood">
            <p class="m muted label">{{ f.hood }}</p>
            <ul>
              <li v-for="item in piece.hood" :key="item"><RichText :text="item" /></li>
            </ul>
          </div>
        </article>
      </div>
      <p class="extra">
        <span class="m muted">{{ f.extraLabel }}</span> {{ f.extra }}
      </p>
    </section>

    <!-- 3 · How it works -->
    <section class="wrap block" aria-labelledby="how-title">
      <h2 id="how-title" class="block-head">
        <span class="block-title"
          ><span class="m num">3 /</span><span class="d">{{ f.howTitle }}</span></span
        >
        <span class="m muted">{{ f.howNote }}</span>
      </h2>
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
              <p class="case-sub">{{ a.appNote }}</p>
            </div>
            <p class="case-sub">{{ a.onDevice }}</p>
          </div>
          <div class="paths">
            <div v-for="path in paths" :key="path.kind" :class="['path', path.kind]">
              <p class="path-head">
                <svg width="40" height="10" viewBox="0 0 40 10" aria-hidden="true">
                  <path v-if="path.kind === 'background'" d="M0 5h38" stroke-dasharray="3 3" />
                  <path v-else d="M0 5h38M34 1l4 4-4 4" />
                </svg>
                <span class="m">{{ path.title }}</span>
                <span class="muted">{{ path.note }}</span>
              </p>
              <div class="grid">
                <div
                  v-for="box in path.boxes"
                  :key="box.name"
                  :class="['box', { soft: !box.strong }]"
                >
                  <p>{{ box.name }}</p>
                  <p class="case-sub">{{ box.note }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bands">
          <p class="band">
            <strong>Sentry</strong> <span class="body">· {{ a.sentry }}</span>
          </p>
          <p class="band">
            <strong>Vercel</strong> <span class="body">· {{ a.hosting }}</span>
          </p>
        </div>
      </figure>
      <ol class="principles">
        <li v-for="p in f.principles" :key="p.name">
          <strong>{{ p.name }}</strong>
          <span class="body"><RichText :text="p.text" /></span>
        </li>
      </ol>
    </section>

    <!-- 4 · How it was built -->
    <section class="wrap block" aria-labelledby="work-title">
      <h2 id="work-title" class="block-head">
        <span class="block-title"
          ><span class="m num">4 /</span><span class="d">{{ f.workTitle }}</span></span
        >
        <span class="m muted">{{ f.workNote }}</span>
      </h2>
      <div class="stats">
        <component
          :is="stat.href ? 'a' : 'div'"
          v-for="stat in f.stats"
          :key="stat.label"
          :href="stat.href || undefined"
          class="stat"
        >
          <b>{{ stat.value }}</b>
          <span>{{ stat.label }}</span>
          <i>{{ stat.note }}</i>
        </component>
      </div>

      <div class="work-text">
        <p v-for="text in f.work" :key="text">{{ text }}</p>
      </div>

      <h3 class="m muted flow-title">{{ f.flowTitle }}</h3>
      <ol class="flow">
        <li v-for="(step, i) in f.flow" :key="step" :class="{ last: i === f.flow.length - 1 }">
          <b>{{ pad(i + 1) }}</b
          >{{ step }}
        </li>
      </ol>
      <p class="flow-note">{{ f.flowNote }}</p>

      <article v-for="(story, i) in f.stories" :key="story.title" class="story">
        <div class="story-key">
          <p class="m num">{{ f.story }} {{ i + 1 }}</p>
          <p class="case-sub">{{ story.tag }}</p>
        </div>
        <div class="story-body">
          <h3>{{ story.title }}</h3>
          <p v-for="text in story.text" :key="text"><RichText :text="text" /></p>
          <template v-if="story.code">
            <figure class="code">
              <figcaption class="m">
                <span class="file">src/app/api/directions/route.ts</span><span>commit 5d73025</span>
              </figcaption>
              <div class="code-scroll">
                <pre><code><span v-for="(line, n) in code" :key="n" :class="['line', { hl: n + 1 === highlighted }]"><i>{{ n + 1 }}</i>{{ line }}</span></code></pre>
              </div>
            </figure>
            <p class="case-note">{{ f.codeNote }}</p>
          </template>
        </div>
      </article>
    </section>

    <!-- 5 · What it does not do yet -->
    <section class="wrap block last-block" aria-labelledby="status-title">
      <h2 id="status-title" class="block-head">
        <span class="block-title"
          ><span class="m num">5 /</span><span class="d">{{ f.statusTitle }}</span></span
        >
        <span class="m muted">{{ f.statusNote }}</span>
      </h2>
      <div class="status-cols">
        <div>
          <h3 class="m muted">{{ f.todayTitle }}</h3>
          <ul class="limits">
            <li v-for="(item, i) in f.today" :key="item">
              <span class="m muted">{{ pad(i + 1) }}</span
              ><span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="m muted">{{ f.nextTitle }}</h3>
          <ul class="limits">
            <li v-for="item in f.next" :key="item">
              <span class="m muted" aria-hidden="true">→</span><span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

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
p {
  margin: 0;
}

.body {
  color: var(--body);
}

.num {
  color: var(--atext);
}

/* 1 · Intro */
.lead {
  max-width: 1040px;
  margin-top: 48px;
  font-family: var(--display);
  font-size: clamp(26px, 3.2vw, 44px);
  font-stretch: 100%;
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.02em;
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 16px;
}

.ctas .case-cta {
  margin-top: 0;
}

.cta2 {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 52px;
  padding: 0 18px;
  border: 1px solid var(--rule3);
  font-weight: 500;
  text-decoration: none;
}

.cta2:hover {
  border-color: var(--fg);
}

.cta3 {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-weight: 500;
}

.guest {
  max-width: 680px;
  margin-top: 20px;
  color: var(--body);
}

.part {
  max-width: 680px;
  margin-top: 28px;
  padding: 4px 0 4px 20px;
  border-left: 2px solid var(--atext);
}

.part p + p {
  margin-top: 8px;
}

.case-facts {
  align-self: flex-start;
}

.shot {
  margin-block: 48px 0;
}

.shot figcaption {
  margin-top: 12px;
}

/* Block headers, the same in the four blocks */
.block {
  padding-top: 120px;
}

.last-block {
  padding-bottom: 120px;
}

.block-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin: 0;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--fg);
  font: inherit;
}

.block-title {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.block-title .num {
  padding-top: 8px;
  white-space: nowrap;
}

.block-title .d {
  font-size: clamp(36px, 4.4vw, 64px);
}

/* 2 · The index as an airport departures board: always a dark screen, split-flap letters.
   Each character sits on its own tile (1ch wide) with the split line across the middle. */
.fids {
  margin-top: 36px;
  padding: 20px 24px 16px;
  border: 1px solid #2a2a2e;
  background: #09090a;
  box-shadow: inset 0 0 0 6px #141416;
  color: #ffc94a;
}

.fids-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  padding-bottom: 14px;
  border-bottom: 2px solid #ffc94a;
}

.fids-title {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--display);
  font-size: 22px;
  font-stretch: 112%;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.fids-title .plane {
  fill: currentColor;
  stroke: none;
}

.fids-title .dim {
  opacity: 0.6;
}

.fids-sub,
.fids-head {
  color: #bfb8a3;
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.fids-head,
.fids a {
  display: grid;
  grid-template-columns: 8ch minmax(0, 1fr) 15ch 2ch;
  align-items: center;
  column-gap: 20px;
}

.fids-head {
  margin: 12px 0 4px;
}

.fids ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

.fids li {
  border-bottom: 1px solid #1e1e22;
}

.fids a {
  min-height: 44px;
  padding: 10px 0;
  color: #ffc94a;
  text-decoration: none;
}

.fids a:hover .flap,
.fids a:focus-visible .flap {
  color: #ffffff;
}

.flap {
  overflow: hidden;
  padding: 2px 0;
  background-image:
    linear-gradient(
      to bottom,
      transparent calc(50% - 0.5px),
      rgb(0 0 0 / 0.75) calc(50% - 0.5px),
      rgb(0 0 0 / 0.75) calc(50% + 0.5px),
      transparent calc(50% + 0.5px)
    ),
    repeating-linear-gradient(90deg, #1c1c20 0 calc(1ch - 2px), transparent calc(1ch - 2px) 1ch);
  font-family: var(--mono);
  font-size: 16px;
  letter-spacing: 0;
  line-height: 1.6;
  text-transform: uppercase;
  white-space: nowrap;
}

.flap.gate {
  color: #8fe3d6;
}

.go {
  color: #bfb8a3;
  font-family: var(--mono);
  text-align: right;
}

/* The pieces as the stops of an itinerary, in Frimee's colour */
.stops {
  position: relative;
  margin-top: 16px;
}

.stops::before {
  content: '';
  position: absolute;
  top: 64px;
  bottom: 64px;
  left: 15px;
  border-left: 2px dashed var(--frimee);
  opacity: 0.55;
}

.stop {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 24px 40px;
  padding: 48px 0 48px 64px;
  border-bottom: 1px solid var(--rule);
  scroll-margin-top: 16px;
}

.pin {
  position: absolute;
  top: 48px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--frimee);
  box-shadow: 0 0 0 4px var(--bg);
  color: #0b0b0c;
  font-family: var(--mono);
  font-size: 13px;
}

.stop-main {
  flex: 1.8 1 440px;
  min-width: 0;
}

.stop-main h3 {
  margin: 0;
  font-family: var(--display);
  font-size: clamp(26px, 2.4vw, 34px);
  font-stretch: 112%;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.seg {
  display: inline-flex;
  margin-top: 16px;
  border: 1px solid var(--rule3);
}

.seg button {
  min-height: 36px;
  padding: 0 16px;
  border: 0;
  background: transparent;
  color: var(--body);
  font-size: 13px;
  letter-spacing: 0.06em;
  cursor: pointer;
}

.seg button + button {
  border-left: 1px solid var(--rule3);
}

.seg button.on {
  background: var(--fg);
  color: var(--bg);
}

.stop-main img {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 20px;
  border: 1px solid var(--rule2);
  background: var(--panel);
}

.stop-main img.phone {
  max-width: 220px;
  border-radius: 18px;
}

.stop-see {
  flex: 1.2 1 320px;
  min-width: 0;
}

.stop-see p + p {
  margin-top: 12px;
}

.label {
  margin-bottom: 12px;
}

/* "Under the hood" as the stub of a Wallet ticket: perforated edge and two notches */
.stop-hood {
  position: relative;
  flex: 1 1 260px;
  align-self: flex-start;
  min-width: 0;
  padding: 18px 20px;
  border-left: 2px dashed var(--frimee);
  background: var(--panel);
}

.stop-hood::before,
.stop-hood::after {
  content: '';
  position: absolute;
  left: -9px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg);
}

.stop-hood::before {
  top: -8px;
}

.stop-hood::after {
  bottom: -8px;
}

.stop-hood ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.stop-hood li {
  color: var(--body);
  font-size: 15px;
  line-height: 1.5;
}

.stop-hood li::before {
  content: '› ';
  color: var(--muted);
  font-family: var(--mono);
}

.extra {
  max-width: 880px;
  margin-top: 28px;
  color: var(--body);
}

.extra .m {
  margin-right: 10px;
}

/* 3 · Architecture: boxes in three paths, from the clients to the services */
.system {
  margin: 40px 0 0;
  padding: clamp(20px, 3vw, 40px);
  border: 1px solid var(--rule2);
  background: var(--panel);
}

.system figcaption {
  margin-bottom: 28px;
}

.system-row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 20px 24px;
}

.clients {
  flex: 1 1 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.paths {
  flex: 999 1 480px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.path {
  padding: 16px;
  border: 1px solid var(--rule2);
}

.path.server {
  border-color: var(--fg);
}

.path.background {
  border-style: dashed;
  border-color: var(--rule3);
}

.path-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 14px;
  margin-bottom: 14px;
  font-size: 15px;
}

.path-head svg {
  color: var(--muted);
}

.path.server .path-head svg {
  color: var(--fg);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 10px;
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

.bands {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}

.band {
  flex: 1 1 280px;
  padding: 12px 16px;
  border: 1px solid var(--rule2);
}

.principles {
  margin: 32px 0 0;
  padding: 0;
  border-top: 1px solid var(--fg);
  list-style: none;
}

.principles li {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 32px;
  padding: 18px 0;
  border-bottom: 1px solid var(--rule);
}

.principles strong {
  flex: 0 0 280px;
  font-weight: 600;
}

.principles .body {
  flex: 1 1 360px;
}

/* 4 · How it was built */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  margin-top: 40px;
  border-top: 1px solid var(--fg);
}

.stat {
  display: block;
  padding: 24px 24px 24px 0;
  border-bottom: 1px solid var(--rule);
  text-decoration: none;
}

.stat b {
  display: block;
  font-family: var(--display);
  font-size: clamp(48px, 5vw, 72px);
  font-stretch: 125%;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
}

.stat span {
  display: block;
  margin-top: 10px;
  color: var(--body);
}

.stat i {
  display: block;
  margin-top: 6px;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 13px;
  font-style: normal;
}

a.stat:hover i {
  color: var(--fg);
}

.work-text {
  max-width: 760px;
  margin-top: 40px;
}

.work-text p + p {
  margin-top: 14px;
}

.work-text p:last-child {
  padding-left: 20px;
  border-left: 2px solid var(--frimee);
}

.flow-title {
  margin: 48px 0 0;
  font: inherit;
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.06em;
}

.flow {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 10px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.flow li {
  flex: 1 1 150px;
  padding: 14px;
  border: 1px solid var(--rule2);
  background: var(--bg);
}

.flow li.last {
  border-color: var(--fg);
}

.flow b {
  display: block;
  margin-bottom: 6px;
  color: var(--atext);
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 400;
}

.flow-note {
  max-width: 880px;
  margin-top: 16px;
  color: var(--body);
}

.story {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 48px;
  padding: 40px 0;
  border-bottom: 1px solid var(--rule);
}

.story:first-of-type {
  margin-top: 40px;
}

.story-key {
  flex: 0 0 220px;
}

.story-body {
  flex: 1 1 520px;
  min-width: 0;
}

.story-body h3 {
  margin: 0;
  font-family: var(--font);
  font-size: 24px;
  font-stretch: normal;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.story-body > p {
  max-width: 720px;
  margin-top: 14px;
}

/* The code stays dark in both themes, like an editor. */
.code {
  margin: 24px 0 0;
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

.story-body .case-note {
  margin-top: 12px;
}

/* 5 · Status */
.status-cols {
  display: flex;
  flex-wrap: wrap;
  gap: 40px 64px;
  margin-top: 36px;
}

.status-cols > div {
  flex: 1 1 400px;
  min-width: 0;
}

.status-cols h3 {
  margin: 0 0 14px;
  font: inherit;
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.06em;
}

.limits {
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--fg);
  list-style: none;
}

.limits li {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--rule);
}

.limits li > .m {
  flex: 0 0 28px;
  padding-top: 3px;
}

@media (max-width: 767px) {
  .stop {
    padding-left: 48px;
  }

  .fids {
    padding: 16px 14px 12px;
  }

  .fids-head,
  .go {
    display: none;
  }

  .fids a {
    grid-template-columns: 7ch minmax(0, 1fr);
    row-gap: 2px;
  }

  .flap {
    font-size: 14px;
  }

  .flap.gate {
    grid-column: 2;
  }

  .fids-title {
    font-size: 18px;
  }

  .fids-title .dim {
    display: none;
  }
}
</style>
