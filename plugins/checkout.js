
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {

		class Checkout {
			is_loaded = false;

			constructor() { }

			async get(to_refresh = false) {
				let url = "/customer/checkout";
				if (to_refresh) {
					url += "?refresh=true";
				}

				const res_data = await useApiFetch("/customer/checkout", {
					method: HTTP_METHOD.GET
				});

				if (res_data.result) {
					const event = new Event("checkout:get");
					document.dispatchEvent(event);
				}

				return res_data;
			}

			async updateShipping(
				// Address
				customer_address_id = 0,
				name = "",
				city_code = "",
				ward_code = "",
				street = "",
				phone = "",
				// Order
				customer_email = "",
				note = ""
			) {
				const res_data = await useApiFetch("/customer/checkout/shipping", {
					method: HTTP_METHOD.PUT,
					body: {
						// Address
						customer_address_id: customer_address_id,
						name: name,
						city_code: city_code,
						ward_code: ward_code,
						street: street,
						phone: phone,
						// Order
						customer_email: customer_email,
						note: note
					}
				});

				if (res_data.result) {
					const event = new Event("checkout:update");
					document.dispatchEvent(event);
				}

				return res_data;
			}

			async updatePayment(
				payment_method_code = ""
			) {
				const res_data = await useApiFetch("/customer/checkout/payment", {
					method: HTTP_METHOD.PUT,
					body: {
						payment_method_code: payment_method_code
					}
				});

				if (res_data.result) {
					const event = new Event("checkout:update");
					document.dispatchEvent(event);
				}

				return res_data;
			}

			async updateOrderInvoice(
				has_invoice,
				company_tax_code,
				company_name,
				company_address,
				company_email,
			) {
				const res_data = await useApiFetch("/customer/checkout/order-invoice", {
					method: HTTP_METHOD.PUT,
					body: {
						has_invoice: has_invoice,
						company_tax_code: company_tax_code,
						company_name: company_name,
						company_address: company_address,
						company_email: company_email,
					}
				});

				if (res_data.result) {
					const event = new Event("checkout:update");
					document.dispatchEvent(event);
				}

				return res_data;
			}

			async placeOrder() {
				const res_data = await useApiFetch("/customer/checkout/place-order", {
					method: HTTP_METHOD.POST
				});

				if (res_data.result) {
					const event = new Event("checkout:place-order");
					document.dispatchEvent(event);
				}

				return res_data;
			}

			async getOrderSuccess() {
				const res_data = await useApiFetch("/customer/checkout/order-success", {
					method: HTTP_METHOD.GET
				});

				return res_data;
			}

			async getOrderFailure() {
				const res_data = await useApiFetch("/customer/checkout/order-failure", {
					method: HTTP_METHOD.GET
				});
				return res_data;
			}
			async getOrderTracking(order_number, phone) {
				const res_data = await useApiFetch('/customer/checkout/order-tracking', {
					method: HTTP_METHOD.POST,
					body: {
						order_number: order_number,
						phone: phone,
					},
				});
				return res_data;
			}
		}

		const checkout = new Checkout();
		return {
			provide: {
				checkout: checkout,
			}
		};
	}
});
