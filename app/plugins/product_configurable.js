
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {
		
		class ProductConfigurable {
			constructor() { }

			async getCompareProduct(target_id, compare_id) {
				const res_data = await useApiFetch(
					"/public/catalog/configurable/compare-product?target=" +
					target_id +
					"&compare=" +
					compare_id,
					{
						method: HTTP_METHOD.GET,
					}
				);

				return res_data;
			}
		}

		const product_configurable = new ProductConfigurable();
		return {
			provide: {
				product_configurable: product_configurable,
			},
		};
	},
});
