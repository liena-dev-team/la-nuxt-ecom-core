
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {
		
		class Faq {
			constructor() { }

			async getCategories() {
				const res_data = await useApiFetch("/public/faq/categories", {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				return res_data;
			}

			async filterFaqsByCategory(category_id, filter_request) {
				if (!filter_request) {
					return;
				}

				const body = { filter_request };
				if (category_id !== null && category_id !== undefined) {
					body.category_id = category_id;
				}

				const res_data = await useApiFetch("/public/faq/filter", {
					method: HTTP_METHOD.POST,
					body,
				});

				return res_data;
			}

			async searchFaq(formSearch) {
				return await useApiFetch("/public/faq/search-faq", {
					method: HTTP_METHOD.POST,
					body: formSearch
				});
			}
		}

		const faq = new Faq();
		return {
			provide: {
				faq: faq,
			},
		};
	},
});
