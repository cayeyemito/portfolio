import '@/styles/main.css'
import { createApp } from 'vue'
import { detectLocale, LOCALE } from '@/i18n'
import HomePage from './HomePage.vue'

// Same entry for / and /en/: the language comes from <html lang>.
createApp(HomePage).provide(LOCALE, detectLocale()).mount('#app')
