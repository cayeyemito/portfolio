<script setup lang="ts">
// A workflow rendered like its job log: one line per step. The file name links to the
// real runs on GitHub, so the green ticks can be checked.
const props = defineProps<{
  file: string
  trigger: string
  steps: { name: string; detail?: string }[]
  runsLabel: string
}>()

const runs = `https://github.com/cayeyemito/portfolio/actions/workflows/${props.file}`
</script>

<template>
  <figure class="ci-log">
    <figcaption>
      <a :href="runs" :title="runsLabel"
        ><code>.github/workflows/{{ file }}</code></a
      >
      <span class="muted trigger">{{ trigger }}</span>
    </figcaption>
    <ol>
      <li v-for="step in steps" :key="step.name">
        <span class="check" aria-hidden="true">✓</span>
        <span class="step">
          <span>{{ step.name }}</span>
          <span v-if="step.detail" class="muted detail">{{ step.detail }}</span>
        </span>
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--rule2);
  color: var(--muted);
}

figcaption a {
  color: var(--fg);
  text-underline-offset: 3px;
}

figcaption code {
  font-size: 1em;
}

ol {
  list-style: none;
  margin: 0;
  padding: 14px 16px;
}

li {
  display: flex;
  gap: 0.6rem;
  line-height: 1.6;
}

li + li {
  margin-top: 6px;
}

.check {
  color: var(--ok);
}

.step {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.8rem;
}

/* On phones the detail goes under the step, aligned with its name. */
@media (max-width: 640px) {
  .step {
    flex-direction: column;
  }

  .detail {
    font-size: 13px;
  }
}
</style>
