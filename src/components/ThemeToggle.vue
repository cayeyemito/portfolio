<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useMessages } from '@/i18n'
import { currentTheme, setTheme, type Theme } from '@/lib/theme'

// A toggle button: its name stays "Light theme" and aria-pressed says whether it is on.
const m = useMessages()
const theme = ref<Theme>('light')
const isLight = computed(() => theme.value === 'light')

// Until a theme is chosen, keep the icon in sync with the system setting. Only in the
// browser: the page is also rendered at build time, where there is no window.
let media: MediaQueryList | undefined
const onSystemChange = () => (theme.value = currentTheme())

onMounted(() => {
  theme.value = currentTheme()
  media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', onSystemChange)
})
onBeforeUnmount(() => media?.removeEventListener('change', onSystemChange))

function toggle() {
  const next: Theme = isLight.value ? 'dark' : 'light'
  setTheme(next)
  theme.value = next
}
</script>

<template>
  <button
    type="button"
    class="toggle"
    :aria-label="m.theme.light"
    :aria-pressed="isLight"
    :title="m.theme.light"
    @click="toggle"
  >
    <!-- Moon while light is on (switches to dark), sun while dark is on. -->
    <svg v-if="isLight" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7z" />
    </svg>
    <svg v-else width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6L13 13M3 13l1.4-1.4M11.6 4.4L13 3" />
    </svg>
  </button>
</template>

<style scoped>
.toggle {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--rule2);
  background: transparent;
  color: var(--fg);
  cursor: pointer;
  transition: border-color 150ms var(--ease);
}

.toggle:hover {
  border-color: var(--fg);
}

svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}
</style>
