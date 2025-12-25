
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {
		
		class Home {
			constructor() { }

			async getSlideShow(identifier) {
				return await useApiFetch("/public/home/slideshow", {
					method: HTTP_METHOD.POST,
					body: {
						identifier: identifier
					}
				});
			}

			async getTopProduct(category_id) {
				const res_data = await useApiFetch("/public/home/top-products", {
					method: HTTP_METHOD.POST,
					body: {
						category_id: category_id
					},
					headers: {
						"Content-Type": "application/json",
					},
				});
				return res_data;
			}

			async getTopFeaturedPosts() {
				const res_data = await useApiFetch("/public/home/top-featured-posts", {
					method: HTTP_METHOD.GET,
					headers: {
						"Content-Type": "application/json",
					},
				});
				return res_data;
			}

			async searchProduct(formSearch) {
				return await useApiFetch("/public/home/search-products", {
					method: HTTP_METHOD.POST,
					body: formSearch
				});
			}
		}

		const home = new Home();
		return {
			provide: {
				home: home,
			},
		};
	},
});
