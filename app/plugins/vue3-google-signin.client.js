
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {
		// TODO: make popup login lazy, and use this in components
		const { googleSignIn } = useRuntimeConfig().public
		if (googleSignIn) {
			const plugin = await import('vue3-google-signin')
			nuxtApp.vueApp.use(plugin.default, { clientId: googleSignIn.clientId })
		}
	}
})
