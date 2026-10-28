<script setup lang="ts">
type Box = { x: number; y: number; w: number; title: string; sub: string; accent?: boolean }

const H = 60
const boxes: Box[] = [
  { x: 20, y: 30, w: 120, title: 'Tú', sub: 'git push' },
  { x: 175, y: 30, w: 130, title: 'GitHub', sub: 'repositorio' },
  { x: 340, y: 30, w: 150, title: 'GitHub Actions', sub: 'ci · deploy · health' },
  { x: 525, y: 30, w: 120, title: 'Entra ID', sub: 'OIDC, temporal' },
  { x: 20, y: 230, w: 120, title: 'Visitante', sub: 'navegador' },
  { x: 340, y: 230, w: 150, title: 'Azure Storage', sub: 'web estática + /status', accent: true },
  { x: 660, y: 230, w: 120, title: 'Log Analytics', sub: 'logs · KQL' },
]

const arrows = [
  'M140 60 H175',
  'M305 60 H340',
  'M490 60 H525',
  'M585 90 V160 H415 V230',
  'M140 260 H340',
  'M490 260 H660',
]
</script>

<template>
  <figure class="diagram">
    <svg viewBox="0 0 800 310" role="img" aria-labelledby="arch-title arch-desc">
      <title id="arch-title">Arquitectura del portfolio</title>
      <desc id="arch-desc">
        Un push a GitHub lanza GitHub Actions, que obtiene un acceso temporal de Entra ID con OIDC y
        sube la web con azcopy a una cuenta de Azure Storage con web estática. Los visitantes entran
        por HTTPS y cada lectura queda registrada en Log Analytics.
      </desc>
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 z" class="head" />
        </marker>
      </defs>
      <path v-for="d in arrows" :key="d" :d="d" class="link" marker-end="url(#arrow)" />
      <text x="425" y="152" class="label">azcopy</text>
      <text x="215" y="252" class="label">HTTPS</text>
      <text x="555" y="252" class="label">logs</text>
      <g v-for="b in boxes" :key="b.title">
        <rect
          :x="b.x"
          :y="b.y"
          :width="b.w"
          :height="H"
          rx="10"
          :class="['box', { accent: b.accent }]"
        />
        <text :x="b.x + b.w / 2" :y="b.y + 26" class="title">{{ b.title }}</text>
        <text :x="b.x + b.w / 2" :y="b.y + 45" class="sub">{{ b.sub }}</text>
      </g>
    </svg>
    <figcaption class="muted">
      Despliegue arriba, tráfico abajo. Ningún secreto de Azure se guarda en GitHub.
    </figcaption>
  </figure>
</template>

<style scoped>
.diagram {
  margin: 0;
}

svg {
  width: 100%;
  font-family: var(--font);
}

.box {
  fill: var(--surface);
  stroke: var(--line);
  stroke-width: 1.5;
}

.box.accent {
  stroke: var(--accent);
}

.title {
  fill: var(--text);
  font-size: 15px;
  font-weight: 600;
  text-anchor: middle;
}

.sub {
  fill: var(--muted);
  font-size: 12px;
  text-anchor: middle;
}

.link {
  fill: none;
  stroke: var(--muted);
  stroke-width: 1.5;
}

.head {
  fill: var(--muted);
}

.label {
  fill: var(--muted);
  font-family: var(--mono);
  font-size: 11px;
}

figcaption {
  margin-top: 0.75rem;
  font-size: 0.9rem;
}
</style>
