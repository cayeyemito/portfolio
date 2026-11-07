<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { profile } from '@/data/profile'
import { otherLocale, pages, useLocale, useMessages, type PageName } from '@/i18n'

const props = defineProps<{ page: PageName }>()

const locale = useLocale()
const m = useMessages()
const other = otherLocale(locale)

// On the home page the anchors are local; elsewhere they point back to it.
const base = computed(() => (props.page === 'home' ? '' : pages.home[locale]))

const sections = computed(() => [
  { num: '01', id: 'projects', label: m.nav.projects },
  { num: '02', id: 'experience', label: m.nav.experience },
  { num: '03', id: 'stack', label: m.nav.stack },
  { num: '04', id: 'contact', label: m.nav.contact },
])

// Mobile menu: a full-screen dialog. Escape closes it, the page behind does not
// scroll while it is open, and focus goes back to the button that opened it.
const open = ref(false)
const openButton = ref<HTMLButtonElement>()
const closeButton = ref<HTMLButtonElement>()

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false
}

watch(open, async (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) {
    document.addEventListener('keydown', onKey)
    await nextTick()
    closeButton.value?.focus()
  } else {
    document.removeEventListener('keydown', onKey)
    openButton.value?.focus()
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="header">
    <div class="wrap bar m">
      <a :href="`${base}#top`" class="brand">
        <span class="logo" aria-hidden="true">{{ profile.initials }}</span>
        <span class="path">{{ profile.handle }}</span>
        <span class="vh">{{ profile.name }}</span>
      </a>
      <nav class="links" :aria-label="m.nav.label">
        <a v-for="s in sections" :key="s.id" :href="`${base}#${s.id}`">
          <span class="num">{{ s.num }}</span> {{ s.label }}
        </a>
      </nav>
      <div class="tools">
        <a
          :href="pages[page][other]"
          :hreflang="other"
          :lang="other"
          :aria-label="m.nav.switchLanguage"
          :title="m.nav.switchLanguage"
          class="language"
          >{{ other }}</a
        >
        <ThemeToggle />
        <button
          ref="openButton"
          type="button"
          class="menu-button m"
          :aria-label="m.nav.openMenu"
          aria-haspopup="dialog"
          :aria-expanded="open"
          @click="open = true"
        >
          {{ m.nav.menu }}
          <svg width="20" height="12" viewBox="0 0 20 12" aria-hidden="true">
            <path d="M0 1h20M6 11h14" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="open" class="menu" role="dialog" aria-modal="true" :aria-label="m.nav.menu">
      <div class="menu-bar m">
        <span class="brand">
          <span class="logo" aria-hidden="true">{{ profile.initials }}</span>
          ~/cayetano
        </span>
        <button
          ref="closeButton"
          type="button"
          class="menu-button m"
          :aria-label="m.nav.closeMenu"
          @click="open = false"
        >
          {{ m.nav.close }}
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
      </div>
      <nav :aria-label="m.nav.label" class="menu-nav">
        <ol>
          <li v-for="s in sections" :key="s.id">
            <a :href="`${base}#${s.id}`" @click="open = false">
              <span class="m num">{{ s.num }}</span>
              <span class="d">{{ s.label }}</span>
            </a>
          </li>
        </ol>
      </nav>
      <div class="menu-foot">
        <a
          v-for="(cv, i) in m.cvs"
          :key="cv.href"
          :href="cv.href"
          :class="['menu-cv', { primary: i === 0 }]"
          download
          >{{ cv.short }} ↓</a
        >
        <a :href="pages[page][other]" :hreflang="other" :lang="other" class="menu-language m">{{
          m.nav.switchLanguage
        }}</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  border-bottom: 1px solid var(--rule);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding-block: 14px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
}

.logo {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: var(--fg);
  color: var(--bg);
  font-family: var(--display);
  font-stretch: 125%;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0;
}

.links {
  display: flex;
  gap: 28px;
}

.links a {
  padding: 12px 0;
  color: var(--muted);
  text-decoration: none;
  transition: color 150ms var(--ease);
}

.links a:hover {
  color: var(--fg);
}

.num {
  color: var(--atext);
}

.tools {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 16px;
}

.language {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--muted);
  text-decoration: none;
}

.language:hover {
  color: var(--fg);
}

.menu-button {
  display: none;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.menu-button svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}

/* Phones: logo, theme and "Menu"; the sections and the language move into the menu. */
@media (max-width: 767px) {
  .path,
  .links,
  .language {
    display: none;
  }

  .menu-button {
    display: inline-flex;
  }
}

.menu {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: var(--ibg);
  color: var(--ifg);
}

.menu-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--ifg);
}

.menu .logo {
  width: 28px;
  height: 28px;
  background: var(--ifg);
  color: var(--ibg);
}

.menu-nav {
  flex: 1;
  padding: 8px 20px;
}

.menu-nav ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu-nav li {
  border-bottom: 1px solid var(--irule);
}

.menu-nav a {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 18px 0;
  color: var(--ifg);
  text-decoration: none;
}

.menu-nav .num {
  width: 24px;
  color: var(--iaccent);
}

.menu-nav .d {
  font-size: 32px;
}

.menu-foot {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  padding: 20px;
  background: var(--bg);
  color: var(--fg);
}

.menu-cv {
  display: flex;
  align-items: center;
  min-height: 52px;
  padding: 0 14px;
  border: 1px solid var(--rule3);
  font-weight: 500;
  text-decoration: none;
}

.menu-cv.primary {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--on-accent);
  font-weight: 600;
}

.menu-language {
  grid-column: 1 / -1;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--muted);
}
</style>
