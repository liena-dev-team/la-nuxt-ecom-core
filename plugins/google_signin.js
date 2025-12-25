
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {

		class GoogleSignin {
			constructor() { }

			async signOut() {
				if (typeof window !== "undefined") {
					const google = window.google?.accounts?.id;
					if (google && google.disableAutoSelect) {
						google.disableAutoSelect();
					} else {
						console.warn("Google Sign-In not available");
					}
				}
			}

			async loginWithGoogle(payload) {
				const res_data = await useApiFetch("/customer/user/login-google", {
					method: HTTP_METHOD.POST,
					body: payload,
				});

				return res_data;
			}

			async register(payload) {
				const res_data = await useApiFetch("/customer/user/register", {
					method: HTTP_METHOD.POST,
					body:payload,
				});

				return res_data;
			}

			async checkPhoneValid(phone, email) {
				const res_data = await useApiFetch(
					"/customer/user/check-phone-google",
					{
						method: HTTP_METHOD.POST,
						body: {
							phone: phone,
							email: email,
						},
					}
				);

				return res_data;
			}

			async checkCustomerExist(phone) {
				const res_data = await useApiFetch(
					"/customer/user/check-customer-exist",
					{
						method: HTTP_METHOD.POST,
						body: {
							phone: phone,
						},
					}
				);

				return res_data;
			}
		}

		const google_signin = new GoogleSignin();

		return {
			provide: {
				googleSignIn: google_signin,
			},
		};
	},
});