import '@/styles/main.css'
import { createApp } from 'vue'
import { detectLocale, LOCALE } from '@/i18n'
import BuildPage from './BuildPage.vue'

// Same entry for /como-esta-hecha/ and /en/how-it-is-built/: the language comes from <html lang>.
createApp(BuildPage).provide(LOCALE, detectLocale()).mount('#app')
