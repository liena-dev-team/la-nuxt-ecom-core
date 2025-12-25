
export default defineNuxtPlugin({
	name: "la_stores",
	parallel: true,
	async setup(nuxtApp) {
		
		class LaStores {
			constructor() { }
			async filterStores(filter_request) {
				const res_data = await useApiFetch("/public/location/stores/filter", {
					method: HTTP_METHOD.POST,
					body: {
						pagination: filter_request.pagination,
						filters: filter_request.filters,
						sorts: filter_request.sorts,
					}
				});

				return res_data;
			}

			async filterDealer(filter_request) {
				const res_data = await useApiFetch("/public/location/dealer/filter", {
					method: HTTP_METHOD.POST,
					body: {
						pagination: filter_request.pagination,
						filters: filter_request.filters,
						sorts: filter_request.sorts,
					}
				});

				return res_data;
			}
			async filterCityStore(filter_request) {
				const res_data = await useApiFetch("/public/location/store/city/filter", {
					method: HTTP_METHOD.POST,
					body: {
						pagination: filter_request.pagination,
						filters: filter_request.filters,
						sorts: filter_request.sorts,
					}
				});

				return res_data;
			}
			async filterWardStore(filter_request) {
				const res_data = await useApiFetch("/public/location/store/ward/filter", {
					method: HTTP_METHOD.POST,
					body: {
						pagination: filter_request.pagination,
						filters: filter_request.filters,
						sorts: filter_request.sorts,
					}
				});

				return res_data;
			}

		}

		const la_stores = new LaStores();
		return {
			provide: {
				la_stores: la_stores,
			},
		};
	},
});
