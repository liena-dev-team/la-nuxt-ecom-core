
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {
		const RESPONSIVE_WIDTH_BREAKPOINT = 768;
		const is_mobile = ref(false);

		function updateIsMobile() {
			const viewport_width = Math.max(
				document.documentElement.clientWidth || 0,
				window.innerWidth || 0
			);
			is_mobile.value = viewport_width <= RESPONSIVE_WIDTH_BREAKPOINT;
		}

		if (import.meta.client) {
			updateIsMobile();
			window.addEventListener("resize", updateIsMobile);
		}

		nuxtApp.provide("is_mobile", is_mobile);
	}
})
