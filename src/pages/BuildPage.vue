<script setup lang="ts">
import ArchitectureDiagram from '@/components/ArchitectureDiagram.vue'
import CiLog from '@/components/CiLog.vue'
import RichText from '@/components/RichText.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import StatusSummary from '@/components/StatusSummary.vue'
import { useMessages } from '@/i18n'

const b = useMessages().build
</script>

<template>
  <SiteHeader page="build" />
  <main class="container page">
    <p class="eyebrow">{{ b.eyebrow }}</p>
    <h1>{{ b.title }}</h1>
    <p class="lead"><RichText :text="b.lead" /></p>

    <section>
      <h2>{{ b.architecture }}</h2>
      <ArchitectureDiagram />
    </section>

    <section>
      <h2>{{ b.pipeline }}</h2>
      <p>{{ b.pipelineText }}</p>
      <CiLog v-for="w in b.workflows" :key="w.file" v-bind="w" />
    </section>

    <section>
      <h2>{{ b.iacTitle }}</h2>
      <p><RichText :text="b.iacText" /></p>
      <ul>
        <li v-for="item in b.iacItems" :key="item"><RichText :text="item" /></li>
      </ul>
    </section>

    <section>
      <h2>{{ b.opsTitle }}</h2>
      <p><RichText :text="b.opsText" /></p>
      <StatusSummary detailed />
    </section>

    <section>
      <h2>{{ b.fromAwsTitle }}</h2>
      <p><RichText :text="b.fromAwsText" /></p>
    </section>

    <section>
      <h2>{{ b.notCoveredTitle }}</h2>
      <p><RichText :text="b.notCoveredText" /></p>
    </section>
  </main>
  <SiteFooter />
</template>

<style scoped>
.page {
  padding-top: 3.5rem;
  padding-bottom: 4rem;
}

h1 {
  font-size: clamp(2rem, 6vw, 3rem);
  letter-spacing: -0.02em;
}

.lead {
  font-size: 1.15rem;
  max-width: 44rem;
  margin: 1rem 0 0;
}

section {
  margin-top: 3.5rem;
}

section > h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

section > p,
section > ul {
  max-width: 44rem;
}

section > * + * {
  margin-top: 1rem;
}
</style>
