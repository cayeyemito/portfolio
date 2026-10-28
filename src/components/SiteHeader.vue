<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
import { profile } from '@/data/profile'

// On the home page the anchors are local; elsewhere they point back to it.
defineProps<{ base?: string }>()
</script>

<template>
  <header class="header">
    <nav class="container nav" aria-label="Principal">
      <a :href="`${base ?? ''}#inicio`" class="brand">{{ profile.name }}</a>
      <ul>
        <li><a :href="`${base ?? ''}#proyectos`">Proyectos</a></li>
        <li><a href="/como-esta-hecha/">Cómo está hecha</a></li>
        <li><a :href="`${base ?? ''}#experiencia`">Experiencia</a></li>
        <li><a :href="`${base ?? ''}#contacto`">Contacto</a></li>
      </ul>
      <ThemeToggle />
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 3.5rem;
}

.brand {
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
  white-space: nowrap;
}

ul {
  display: flex;
  gap: 1.25rem;
  /* Links sit on the right, next to the theme toggle. */
  margin: 0 0 0 auto;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;
}

ul a {
  color: var(--muted);
  text-decoration: none;
}

ul a:hover {
  color: var(--text);
}

/* On narrow screens only the dedicated page link stays visible. */
@media (max-width: 640px) {
  ul li:not(:nth-child(2)) {
    display: none;
  }
}
</style>
