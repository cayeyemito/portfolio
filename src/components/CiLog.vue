<script setup lang="ts">
// A workflow rendered like its job log: one line per step.
defineProps<{
  file: string
  trigger: string
  steps: { name: string; detail?: string }[]
}>()
</script>

<template>
  <figure class="ci-log">
    <figcaption>
      <code>.github/workflows/{{ file }}</code> <span class="muted">· {{ trigger }}</span>
    </figcaption>
    <ol>
      <li v-for="step in steps" :key="step.name">
        <span class="check" aria-hidden="true">✓</span>
        <span>{{ step.name }}</span>
        <span v-if="step.detail" class="muted detail">{{ step.detail }}</span>
      </li>
    </ol>
  </figure>
</template>

<style scoped>
.ci-log {
  margin: 0;
  border: 1px solid var(--rule2);
  background: var(--panel);
  font-family: var(--mono);
  font-size: 14px;
}

.ci-log + .ci-log {
  margin-top: 16px;
}

figcaption {
  padding: 10px 16px;
  border-bottom: 1px solid var(--rule2);
  color: var(--muted);
}

figcaption code {
  color: var(--fg);
  font-size: 1em;
}

ol {
  list-style: none;
  margin: 0;
  padding: 14px 16px;
}

li {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.6rem;
  line-height: 1.9;
}

.check {
  color: var(--ok);
}

.detail::before {
  content: '— ';
}
</style>
