
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {

		class CustomerAccount {
			constructor() { }

			/**
			 * General
			 */
			async getGeneralInfo() {
				const res_data = await useApiFetch("/customer/account/general", {
					method: HTTP_METHOD.GET,
				});

				return res_data;
			}

			/**
			 * Account Info
			 */
			async getAccountInfo() {
				const res_data = await useApiFetch("/customer/account/info", {
					method: HTTP_METHOD.GET,
				});

				return res_data;
			}

			async updateAccountInfo(data_params) {
				const res_data = await useApiFetch("/customer/account/info", {
					method: HTTP_METHOD.PUT,
					body: data_params,
				});

				return res_data;
			}

			/**
			 * Address Book
			 */
			async getAddressBook() {
				const res_data = await useApiFetch("/customer/account/address/book", {
					method: HTTP_METHOD.GET,
				});

				return res_data;
			}

			async filterAddresses(filter_request) {
				const res_data = await useApiFetch("/customer/account/address/filter", {
					method: HTTP_METHOD.POST,
					body: {
						pagination: filter_request.pagination,
						filters: filter_request.filters,
						sorts: filter_request.sorts,
					},
				});

				return res_data;
			}

			async getAddressById(id) {
				const res_data = await useApiFetch(
					"/customer/account/address/id/" + id,
					{
						method: HTTP_METHOD.GET,
					}
				);

				return res_data;
			}

			async addAddress(address) {
				const res_data = await useApiFetch("/customer/account/address", {
					method: HTTP_METHOD.POST,
					body: address,
				});

				return res_data;
			}

			async updateAddress(id, address) {
				const res_data = await useApiFetch(
					"/customer/account/address/id/" + id,
					{
						method: HTTP_METHOD.PUT,
						body: address,
					}
				);

				return res_data;
			}

			async deleteAddress(id) {
				const res_data = await useApiFetch(
					"/customer/account/address/id/" + id,
					{
						method: HTTP_METHOD.DELETE,
					}
				);

				return res_data;
			}

			/**
			 * Sales Order
			 */
			async filterSalesOrders(filter_request) {
				const res_data = await useApiFetch(
					"/customer/account/sales-order/filter",
					{
						method: HTTP_METHOD.POST,
						body: {
							pagination: filter_request.pagination,
							filters: filter_request.filters,
							sorts: filter_request.sorts,
						},
					}
				);

				return res_data;
			}

			async getOneSalesOrder(id) {
				const res_data = await useApiFetch(
					"/customer/account/sales-order/id/" + id,
					{
						method: HTTP_METHOD.GET,
					}
				);

				return res_data;
			}

			async reOrder() {
				const res_data = await useApiFetch("/customer/account/general", {
					method: HTTP_METHOD.POST,
					body: {},
				});

				return res_data;
			}

			/**
			 * Product Review
			 */
			async filterProductReviews(formData) {
				const res_data = await useApiFetch(
					"/customer/account/product-review/filter",
					{
						method: HTTP_METHOD.POST,
						body: formData,
					}
				);

				return res_data;
			}

			async getOneProductReview(id) {
				const res_data = await useApiFetch(
					`/customer/account/product-review/id/${id}`,
					{
						method: HTTP_METHOD.GET,
					}
				);

				return res_data;
			}
		}

		const customer_account = new CustomerAccount();
		return {
			provide: {
				customer_account: customer_account,
			},
		};
	},
});
