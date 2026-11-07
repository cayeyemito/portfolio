<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { activeSection } from '@/lib/scrollspy'

// Table of contents of a case page. The section being read is highlighted and marked
// with aria-current; it follows the scroll (in the browser only, not when prerendering).
const props = defineProps<{ sections: { id: string; title: string }[]; label: string }>()

const active = ref(props.sections[0]?.id)
let frame = 0
// After a click, the smooth scroll to that section must not move the highlight
// (near the bottom it would otherwise jump to the last section).
let lockedUntil = 0

function select(id: string) {
  active.value = id
  lockedUntil = performance.now() + 1000
}

function update() {
  frame = 0
  if (performance.now() < lockedUntil) return
  const tops = props.sections.map((s) => ({
    id: s.id,
    top: document.getElementById(s.id)?.getBoundingClientRect().top ?? Infinity,
  }))
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  active.value = activeSection(tops, window.innerHeight, atBottom)
}

// At most one update per frame, however many scroll events arrive.
function onScroll() {
  if (!frame) frame = requestAnimationFrame(update)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <nav class="m case-toc" :aria-label="label">
    <ol>
      <li v-for="(s, i) in sections" :key="s.id">
        <a
          :href="`#${s.id}`"
          :class="{ active: s.id === active }"
          :aria-current="s.id === active ? 'location' : undefined"
          @click="select(s.id)"
          ><span class="num">{{ i + 1 }}</span> {{ s.title }}</a
        >
      </li>
    </ol>
  </nav>
</template>
