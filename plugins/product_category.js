
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {
		
		class ProductCategory {
			constructor() { }

			// async initFilter(category_id) {
			// 	if (!filter_request) {
			// 		return;
			// 	}

			// 	const res_data = await useApiFetch(
			// 		'/public/catalog/category/init-filter', {
			// 		method: HTTP_METHOD.POST,
			// 		body: {
			// 			category_id: category_id
			// 		}
			// 	});

			// 	return res_data;
			// }

			async filter(category_id, filter_request, is_promotion_category) {
				if (!filter_request) {
					return;
				}

				const res_data = await useApiFetch(
					'/public/catalog/category/filter', {
					method: HTTP_METHOD.POST,
					body: {
						category_id: category_id,
						is_promotion_category: is_promotion_category,
						filter_request: filter_request,
					}
				});

				return res_data;
			}
		}

		const product_category = new ProductCategory();
		return {
			provide: {
				product_category: product_category,
			},
		};
	}
});
