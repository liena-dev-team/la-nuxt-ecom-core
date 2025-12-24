// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  components: [
		{ path: '../app/components/la', pathPrefix: false }
	],
  devtools: { enabled: true }
})
