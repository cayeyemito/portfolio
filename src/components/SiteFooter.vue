<script setup lang="ts">
import { profile } from '@/data/profile'
import { useMessages } from '@/i18n'

const m = useMessages()
</script>

<template>
  <footer class="footer">
    <div class="container row">
      <span>© {{ new Date().getFullYear() }} {{ profile.name }}</span>
      <span>
        {{ m.footer.madeWith }} ·
        <a href="/status/">{{ m.footer.status }}</a>
      </span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  padding: 2rem 0;
  font-size: 0.85rem;
  color: var(--muted);
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
}
</style>
