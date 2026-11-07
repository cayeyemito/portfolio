<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLocale, useMessages } from '@/i18n'
import { fetchReport, formatDate, summarize, type Report } from '@/lib/status'

const locale = useLocale()
const m = useMessages()

const report = ref<Report | null>(null)
const state = ref<'loading' | 'ready' | 'missing' | 'error'>('loading')

onMounted(async () => {
  try {
    report.value = await fetchReport()
    state.value = report.value ? 'ready' : 'missing'
  } catch {
    state.value = 'error'
  }
})
</script>

<template>
  <div class="status" aria-live="polite">
    <p v-if="state === 'loading'" class="muted">{{ m.status.loading }}</p>
    <p v-else-if="state === 'missing'" class="muted">{{ m.status.missing }}</p>
    <p v-else-if="state === 'error'" class="muted">{{ m.status.error }}</p>
    <template v-else-if="report">
      <p class="verdict">
        <span :class="['dot', report.ok ? 'ok' : 'fail']" aria-hidden="true"></span>
        <strong>{{ report.ok ? m.status.summaryOk : m.status.failed }}</strong>
        <span class="muted">
          · {{ summarize(report).passed }}/{{ summarize(report).total }} {{ m.status.checks }} ·
          {{ formatDate(report.generated_at, locale) }}
        </span>
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">{{ m.status.check }}</th>
            <th scope="col">{{ m.status.result }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in report.checks" :key="c.group + c.name">
            <td>
              <span class="group">{{ c.group }}</span> {{ c.name }}
            </td>
            <td :class="c.ok ? 'ok' : 'fail'">
              {{ c.ok ? m.status.pass : m.status.fail }} · {{ c.detail }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <a href="/status/" class="more">{{ m.status.fullReport }}</a>
  </div>
</template>

<style scoped>
.status {
  padding: clamp(20px, 3vw, 32px);
  border: 1px solid var(--rule2);
  background: var(--panel);
}

.status p {
  margin: 0;
}

.verdict {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
}

.dot {
  width: 8px;
  height: 8px;
}

.dot.ok {
  background: var(--ok);
}

.dot.fail {
  background: var(--fail);
}

td.ok {
  color: var(--ok);
}

td.fail {
  color: var(--fail);
}

table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th,
td {
  text-align: left;
  padding: 0.45rem 0.5rem;
  border-bottom: 1px solid var(--rule);
  vertical-align: top;
  overflow-wrap: anywhere;
}

.group {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}

.more {
  display: inline-block;
  margin-top: 0.9rem;
  font-size: 0.9rem;
}
</style>
