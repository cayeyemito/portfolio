<script setup lang="ts">
import type { Project } from '@/lib/projects'

defineProps<{ project: Project }>()
</script>

<template>
  <article :id="project.slug" class="card project">
    <img
      v-if="project.image"
      :src="project.image.src"
      :alt="project.image.alt"
      :width="project.image.width"
      :height="project.image.height"
      loading="lazy"
      class="cover"
    />
    <div class="head">
      <h3>{{ project.title }}</h3>
      <span class="status">{{ project.status }}</span>
    </div>
    <p>{{ project.problem }}</p>
    <p class="muted role">{{ project.role }}</p>
    <ul class="tags" aria-label="Stack">
      <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
    </ul>
    <div class="links">
      <a v-if="project.links.demo" :href="project.links.demo" class="button primary">Ver demo</a>
      <a v-if="project.links.repo" :href="project.links.repo" class="button">Repositorio</a>
    </div>
  </article>
</template>

<style scoped>
.project {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.cover {
  border-radius: 0.6rem;
  border: 1px solid var(--line);
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: top;
  width: 100%;
}

.head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
}

h3 {
  font-size: 1.4rem;
}

.status {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--muted);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0.1rem 0.6rem;
}

p {
  margin: 0;
}

.role {
  font-size: 0.95rem;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.5rem;
}
</style>
