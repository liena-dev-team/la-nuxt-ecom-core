// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  components: [
    { path: './components/la', pathPrefix: false }
  ],
  devtools: { enabled: true }
})
