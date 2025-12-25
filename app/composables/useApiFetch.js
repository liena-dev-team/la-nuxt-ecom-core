
export const useApiFetch = async (url, opts) => {
	try {
		const data = await $fetch("/backend_api" + url, {
			...opts,
		}).catch((error) => {
			console.log("Api Fetch Error:");
			console.log(error);
		});
		
		return data;
	} catch (error) {
		console.log("Fetch ERROR:");
		console.log(error);
	}
};
