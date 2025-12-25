
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {
						
		class Blog {
			constructor() { }
			
			async getFeaturedPosts(category_id) {
				const res_data = await useApiFetch("/public/blog/posts/featured/" + category_id, {
					method: HTTP_METHOD.GET
				});
				
				return res_data;
			}
			
			async filterPosts(category_id, filter_request) {
				if (!filter_request) {
					return;
				}

				const res_data = await useApiFetch("/public/blog/posts/filter", {
					method: HTTP_METHOD.POST,
					body: {
						category_id: category_id,
						filter_request: filter_request,
					},
				});

				return res_data;
			}
		}

		const blog = new Blog();
		return {
			provide: {
				blog: blog,
			},
		};
	},
});
