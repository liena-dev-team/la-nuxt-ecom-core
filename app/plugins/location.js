
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {
		
		class Location {
			constructor() { }

			async filterWards(filter_request) {
				const res_data = await useApiFetch("/public/location/ward/filter", {
					method: HTTP_METHOD.POST,
					body: {
						pagination: filter_request.pagination,
						filters: filter_request.filters,
						sorts: filter_request.sorts,
					}
				});

				return res_data;
			}
			
			async filterCities(filter_request) {
				const res_data = await useApiFetch("/public/location/city/filter", {
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

		const location = new Location();
		return {
			provide: {
				location: location,
			},
		};
	},
});
