
import { VueReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {
		// TODO: LOAD Recaptcha in Component, not Plugin
		const config = useRuntimeConfig()
		if (!config.public.recaptchaSiteKey) {
			console.warn('reCAPTCHA siteKey is missing! Please set RECAPTCHA_SITE_KEY in your environment.')
			return;
		}
			
		nuxtApp.vueApp.use(VueReCaptcha, {
			siteKey: config.public.recaptchaSiteKey,
			loaderOptions: {}
		})
	}
})
