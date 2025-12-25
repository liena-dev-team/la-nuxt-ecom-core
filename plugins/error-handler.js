export default defineNuxtPlugin((nuxtApp) => {

	nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
		// handle error, e.g. report to a service
		// console.log("errorHandler");
		// console.log(error);
	}

	// Hook app:error
	nuxtApp.hook('app:error', (error, instance, info) => {
		// handle error, e.g. report to a service
		// console.log("app:error");
		// console.log(error);
	})

	// Hook vue:error
	nuxtApp.hook('vue:error', (error, instance, info) => {
		// handle error, e.g. report to a service
		// console.log("vue:error");
	})
	
})
