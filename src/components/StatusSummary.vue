<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchReport, formatDate, summarize, type Report } from '@/lib/status'

// "detailed" shows every check; otherwise only the verdict line.
defineProps<{ detailed?: boolean }>()

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
  <div class="status card" aria-live="polite">
    <p v-if="state === 'loading'" class="muted">Cargando el último informe…</p>
    <p v-else-if="state === 'missing'" class="muted">
      Todavía no hay informe: se genera una vez al día.
    </p>
    <p v-else-if="state === 'error'" class="muted">No se ha podido leer el informe de estado.</p>
    <template v-else-if="report">
      <p class="verdict">
        <span :class="['dot', report.ok ? 'ok' : 'fail']" aria-hidden="true"></span>
        <strong>{{ report.ok ? 'Todo en orden' : 'Hay comprobaciones fallidas' }}</strong>
        <span class="muted">
          · {{ summarize(report).passed }}/{{ summarize(report).total }} comprobaciones ·
          {{ formatDate(report.generated_at) }}
        </span>
      </p>
      <table v-if="detailed">
        <thead>
          <tr>
            <th scope="col">Comprobación</th>
            <th scope="col">Resultado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in report.checks" :key="c.group + c.name">
            <td>
              <span class="group">{{ c.group }}</span> {{ c.name }}
            </td>
            <td :class="c.ok ? 'ok' : 'fail'">{{ c.ok ? 'OK' : 'Fallo' }} · {{ c.detail }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <a href="/status/" class="more">Ver el informe completo →</a>
  </div>
</template>

<style scoped>
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
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
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
  border-bottom: 1px solid var(--line);
  vertical-align: top;
  overflow-wrap: anywhere;
}

.group {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--muted);
}

.more {
  display: inline-block;
  margin-top: 0.9rem;
  font-size: 0.9rem;
}
</style>
