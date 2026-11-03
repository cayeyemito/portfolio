<script setup lang="ts">
import { computed } from 'vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { profile } from '@/data/profile'
import { otherLocale, pages, useLocale, useMessages, type PageName } from '@/i18n'

const props = defineProps<{ page: PageName }>()

const locale = useLocale()
const m = useMessages()
const other = otherLocale(locale)

// On the home page the anchors are local; elsewhere they point back to it.
const base = computed(() => (props.page === 'home' ? '' : pages.home[locale]))
</script>

<template>
  <header class="header">
    <nav class="container nav" :aria-label="m.nav.label">
      <a :href="`${base}#top`" class="brand">{{ profile.name }}</a>
      <ul>
        <li>
          <a :href="`${base}#projects`">{{ m.nav.projects }}</a>
        </li>
        <li>
          <a :href="pages.build[locale]">{{ m.nav.build }}</a>
        </li>
        <li>
          <a :href="`${base}#experience`">{{ m.nav.experience }}</a>
        </li>
        <li>
          <a :href="`${base}#contact`">{{ m.nav.contact }}</a>
        </li>
      </ul>
      <a
        :href="pages[page][other]"
        :hreflang="other"
        :lang="other"
        :aria-label="m.nav.switchLanguage"
        :title="m.nav.switchLanguage"
        class="language"
        >{{ other.toUpperCase() }}</a
      >
      <ThemeToggle />
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 3.5rem;
}

.brand {
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
  white-space: nowrap;
}

ul {
  display: flex;
  gap: 1.25rem;
  /* Links sit on the right, next to the theme toggle. */
  margin: 0 0 0 auto;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;
}

ul a {
  color: var(--muted);
  text-decoration: none;
}

ul a:hover {
  color: var(--text);
}

.language {
  flex-shrink: 0;
  font-family: var(--mono);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--muted);
  text-decoration: none;
}

.language:hover {
  color: var(--text);
}

/* On narrow screens only the dedicated page link stays visible. */
@media (max-width: 640px) {
  ul li:not(:nth-child(2)) {
    display: none;
  }
}
</style>
