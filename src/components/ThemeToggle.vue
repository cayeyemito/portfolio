<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useMessages } from '@/i18n'
import { currentTheme, setTheme, type Theme } from '@/lib/theme'

const m = useMessages()
const theme = ref<Theme>('light')
const next = computed<Theme>(() => (theme.value === 'dark' ? 'light' : 'dark'))
const label = computed(() => (next.value === 'dark' ? m.theme.toDark : m.theme.toLight))

// Until a theme is chosen, keep the icon in sync with the system setting.
const media = window.matchMedia('(prefers-color-scheme: dark)')
const onSystemChange = () => (theme.value = currentTheme())

onMounted(() => {
  theme.value = currentTheme()
  media.addEventListener('change', onSystemChange)
})
onBeforeUnmount(() => media.removeEventListener('change', onSystemChange))

function toggle() {
  setTheme(next.value)
  theme.value = next.value
}
</script>

<template>
  <button type="button" class="toggle" :aria-label="label" :title="label" @click="toggle">
    <!-- Icon of the theme the button switches to. -->
    <svg v-if="next === 'light'" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
    <svg v-else viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  </button>
</template>

<style scoped>
.toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  transition: border-color 0.15s;
}

.toggle:hover {
  border-color: var(--text);
}

.toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

svg {
  width: 1.1rem;
  height: 1.1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
