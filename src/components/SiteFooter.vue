<script setup lang="ts">
import { profile } from '@/data/profile'
import { useMessages } from '@/i18n'

const m = useMessages()
</script>

<template>
  <footer class="footer">
    <div class="wrap row m">
      <span>© {{ new Date().getFullYear() }} {{ profile.fullName }}</span>
      <span>
        {{ m.footer.madeWith }} · <a href="/status/">{{ m.footer.status }}</a> ·
        <a :href="profile.links.source">{{ m.footer.source }} ↗</a>
      </span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--rule);
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px 32px;
  padding-block: 22px;
  color: var(--muted);
}

a {
  color: var(--muted);
}

a:hover {
  color: var(--fg);
}
</style>
