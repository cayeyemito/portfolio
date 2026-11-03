<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLocale, useMessages } from '@/i18n'
import { fetchReport, timeAgo, type Report } from '@/lib/status'

// One-line status under the name: verdict from report.json (only when it exists) plus deploy age.
const m = useMessages()
const report = ref<Report | null>(null)
const deployed = timeAgo(__BUILD_TIME__, Date.now(), useLocale())

onMounted(async () => {
  try {
    report.value = await fetchReport()
  } catch {
    report.value = null
  }
})
</script>

<template>
  <a href="/status/" class="status-line" aria-live="polite">
    <template v-if="report">
      <span :class="['dot', report.ok ? 'ok' : 'fail']" aria-hidden="true">●</span>
      {{ report.ok ? m.status.allOk : m.status.failed }}
      <span aria-hidden="true">·</span>
    </template>
    {{ m.status.lastDeploy }} {{ deployed }}
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
  color: var(--text);
}

.dot.ok {
  color: var(--ok);
}

.dot.fail {
  color: var(--fail);
}
</style>
