<script setup lang="ts">
// A workflow rendered like its job log: one line per step.
defineProps<{
  file: string
  trigger: string
  steps: { name: string; detail?: string }[]
}>()
</script>

<template>
  <figure class="ci-log card">
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
  padding: 1rem 1.25rem;
  font-family: var(--mono);
  font-size: 0.82rem;
}

figcaption {
  padding-bottom: 0.6rem;
  margin-bottom: 0.6rem;
  border-bottom: 1px solid var(--line);
}

figcaption code {
  font-size: 1em;
}

ol {
  list-style: none;
  margin: 0;
  padding: 0;
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
