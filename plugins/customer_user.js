
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {

		const customer_store = useCustomerStore();

		class CustomerUser {
			async register(phone, email, name, password) {
				const res_data = await useApiFetch("/customer/user/register", {
					method: HTTP_METHOD.POST,
					body: {
						phone: phone,
						email: email,
						name: name,
						password: password,
					},
				});

				return res_data;
			}

			async login(payload) {
				const res_data = await useApiFetch("/customer/user/login", {
					method: HTTP_METHOD.POST,
					body: payload,
				});

				return res_data;
			}

			async sendOtp(payload) {
				const headers = useRequestHeaders(["cookie"]);
				const res_data = await useApiFetch("/customer/otp/send", {
					method: HTTP_METHOD.POST,
					body: payload,
					headers: {
						"Content-Type": "application/json",
						...headers,
					},
					credentials: "include",
				});
				return res_data;
			}

			async smsLogin(payload) {
				const headers = useRequestHeaders(["cookie"]);
				const res_data = await useApiFetch("/customer/user/sms-login", {
					method: HTTP_METHOD.POST,
					body: payload,
					headers: {
						"Content-Type": "application/json",
						...headers,
					},
					credentials: "include",
				});
				return res_data;
			}

			async changePassword(phone, password) {
				const headers = useRequestHeaders(["cookie"]);
				const res_data = await useApiFetch("/customer/user/change-password", {
					method: HTTP_METHOD.POST,
					body: {
						phone: phone,
						password: password,
					},
					headers: {
						"Content-Type": "application/json",
						...headers,
					},
					credentials: "include",
				});
				return res_data;
			}

			async verifyOtp(payload) {
				const headers = useRequestHeaders(["cookie"]);
				const res_data = await useApiFetch("/api/otp/verify", {
					method: HTTP_METHOD.POST,
					body: payload,
					headers: {
						"Content-Type": "application/json",
						...headers,
					},
					credentials: "include",
				});
				return res_data;
			}

			async logout() {
				const res_data = await useApiFetch("/customer/user/logout", {
					method: HTTP_METHOD.POST,
				});

				customer_store.is_authenticated = false;
				customer_store.customer = null;

				return res_data;
			}

			async getMe() {
				const res_data = await useApiFetch("/customer/user/me", {
					method: HTTP_METHOD.GET,
				});

				if (res_data && res_data.result && res_data.customer) {
					customer_store.is_authenticated = true;
					customer_store.customer = res_data.customer;
				} else {
					customer_store.is_authenticated = false;
					customer_store.customer = null;
				}
			}
		}

		const customer_user = new CustomerUser();
		return {
			provide: {
				customer_user: customer_user,
			},
		};
	},
});
