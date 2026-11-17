<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLocale, useMessages } from '@/i18n'
import { fetchReport, timeAgo, type Report } from '@/lib/status'

// Status in the fact sheet of the build page: the verdict from report.json (only when it
// exists) or how long ago the site was deployed, one per row.
const props = defineProps<{ show: 'verdict' | 'deploy' }>()
const m = useMessages()
const report = ref<Report | null>(null)
const locale = useLocale()
// Set in the browser: at build time (prerendering) it would always say "just now".
const deployed = ref('')

onMounted(async () => {
  deployed.value = timeAgo(__BUILD_TIME__, Date.now(), locale)
  try {
    report.value = await fetchReport()
  } catch {
    report.value = null
  }
})
</script>

<template>
  <a href="/status/" class="status-line" aria-live="polite">
    <template v-if="props.show === 'verdict' && report">
      <span :class="['dot', report.ok ? 'ok' : 'fail']" aria-hidden="true">●</span>
      {{ report.ok ? m.status.allOk : m.status.failed }}
    </template>
    <template v-else-if="props.show === 'deploy' && deployed">{{ deployed }}</template>
  </a>
</template>

<style scoped>
.status-line {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--muted);
  text-decoration: none;
}

.status-line:hover {
  color: var(--fg);
}

.dot.ok {
  color: var(--ok);
}

.dot.fail {
  color: var(--fail);
}
</style>
