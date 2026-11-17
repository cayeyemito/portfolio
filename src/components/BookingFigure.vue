<script setup lang="ts">
import { useMessages } from '@/i18n'

// The booking API card's figure: the constraint that keeps two bookings from overlapping.
// From src/main/resources/db/migration/V1__create_rooms_and_bookings.sql in
// cayeyemito/hotel-booking-api. Verbatim, so it is not translated.
const b = useMessages().projects.booking
const sql = [
  'ALTER TABLE bookings',
  'ADD CONSTRAINT bookings_no_overlap',
  'EXCLUDE USING GIST (',
  '    room_id WITH =,',
  "    daterange(check_in, check_out, '[)') WITH &&",
  ')',
  "WHERE (status = 'CONFIRMED');",
]
</script>

<template>
  <figure class="booking">
    <figcaption class="m">{{ b.caption }}</figcaption>
    <pre><code>{{ sql.join('\n') }}</code></pre>
    <p class="note">{{ b.note }}</p>
  </figure>
</template>

<style scoped>
.booking {
  margin: 0;
  padding: clamp(20px, 3vw, 40px);
  border: 1px solid var(--rule2);
  background: var(--panel);
}

figcaption {
  margin-bottom: 20px;
  color: var(--muted);
}

/* The SQL as it is in the migration: the site's mono labels are uppercase, this is not. */
pre {
  margin: 0;
  overflow-x: auto;
  font-family: var(--mono);
  text-transform: none;
  letter-spacing: normal;
  font-size: 14px;
  line-height: 1.6;
  color: var(--fg);
}

.note {
  margin: 20px 0 0;
  padding-top: 16px;
  border-top: 1px solid var(--rule);
  color: var(--body);
  font-size: 15px;
}
</style>
