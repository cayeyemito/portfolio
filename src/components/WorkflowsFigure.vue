<script setup lang="ts">
import { useMessages } from '@/i18n'

// The portfolio card's figure: which GitHub Actions workflows run, and when.
const w = useMessages().projects.workflows
</script>

<template>
  <figure class="workflows">
    <figcaption class="m">{{ w.caption }}</figcaption>
    <div class="rows">
      <div v-for="row in w.rows" :key="row.label" class="row">
        <span class="m label">{{ row.label }}</span>
        <ol>
          <template v-for="(step, i) in row.steps" :key="step">
            <li v-if="i > 0" class="arrow" aria-hidden="true">
              <svg width="18" height="10" viewBox="0 0 18 10">
                <path d="M0 5h16M12 1l4 4-4 4" />
              </svg>
            </li>
            <li class="m step">{{ step }}</li>
          </template>
        </ol>
      </div>
      <div class="row">
        <span class="m label">{{ w.scheduled }}</span>
        <code class="m scheduled">ops/site_health.py</code>
        <span class="note">{{ w.scheduledNote }}</span>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.workflows {
  margin: 0;
  padding: clamp(20px, 3vw, 40px);
  border: 1px solid var(--rule2);
  background: var(--panel);
}

figcaption {
  margin-bottom: 24px;
  color: var(--muted);
}

.rows {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 16px;
}

.row + .row {
  padding-top: 20px;
  border-top: 1px solid var(--rule);
}

.label {
  flex: 0 0 120px;
  color: var(--muted);
}

ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.step {
  padding: 12px 14px;
  border: 1px solid var(--rule2);
  background: var(--bg);
}

.arrow {
  color: var(--rule3);
}

.arrow svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}

.scheduled {
  padding: 12px 14px;
  border: 1px dashed var(--rule3);
  text-transform: none;
}

.note {
  color: var(--muted);
  font-size: 15px;
}
</style>
