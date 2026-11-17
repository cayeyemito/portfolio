<script setup lang="ts">
import { onMounted, ref } from 'vue'

// A muted, looping clip that starts in the browser only and never when the visitor asked
// for reduced motion (then the poster stays). The button can pause it at any time.
const props = defineProps<{
  src: string
  poster: string
  width: number
  height: number
  label: string
  playLabel: string
  pauseLabel: string
}>()

const video = ref<HTMLVideoElement>()
const playing = ref(false)

function toggle() {
  const el = video.value
  if (!el) return
  if (el.paused) void el.play()
  else el.pause()
}

onMounted(() => {
  const el = video.value
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  el.play().catch(() => {
    // Autoplay blocked: the poster stays and the button can start it.
  })
})
</script>

<template>
  <div class="video">
    <video
      ref="video"
      :aria-label="props.label"
      :poster="props.poster"
      :width="props.width"
      :height="props.height"
      muted
      loop
      playsinline
      preload="metadata"
      @play="playing = true"
      @pause="playing = false"
    >
      <source :src="props.src" type="video/mp4" />
    </video>
    <button
      type="button"
      class="m video-toggle"
      :aria-label="playing ? props.pauseLabel : props.playLabel"
      @click="toggle"
    >
      <svg v-if="playing" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M5 3v10M11 3v10" />
      </svg>
      <svg v-else width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M4 2.5v11L13 8z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.video {
  position: relative;
}

.video video {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--rule2);
  background: var(--panel);
}

/* Fixed dark chip over the video, readable on any frame and in both themes. */
.video-toggle {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid #34343a;
  background: rgb(11 11 12 / 0.8);
  color: #efede8;
  cursor: pointer;
}

.video-toggle svg {
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 1.5;
}
</style>
