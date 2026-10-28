<script setup lang="ts">
import { computed } from 'vue'

// Renders the tiny markup used in the i18n strings: `code`, [label](url) and
// *emphasis*. Everything else is plain text, escaped by Vue (no v-html).
const props = defineProps<{ text: string }>()

type Part =
  | { kind: 'text'; value: string }
  | { kind: 'code'; value: string }
  | { kind: 'em'; value: string }
  | { kind: 'link'; value: string; href: string }

const TOKEN = /(`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/

const parts = computed<Part[]>(() =>
  props.text
    .split(TOKEN)
    .filter(Boolean)
    .map((piece): Part => {
      if (piece.startsWith('`')) return { kind: 'code', value: piece.slice(1, -1) }
      if (piece.startsWith('*')) return { kind: 'em', value: piece.slice(1, -1) }
      const link = piece.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
      if (link) return { kind: 'link', value: link[1]!, href: link[2]! }
      return { kind: 'text', value: piece }
    }),
)
</script>

<template>
  <template v-for="(part, i) in parts" :key="i">
    <code v-if="part.kind === 'code'">{{ part.value }}</code>
    <em v-else-if="part.kind === 'em'">{{ part.value }}</em>
    <a v-else-if="part.kind === 'link'" :href="part.href">{{ part.value }}</a>
    <template v-else>{{ part.value }}</template>
  </template>
</template>
