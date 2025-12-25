
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {

		class Cart {
			constructor() { }

			async getItemQty() {
				const res_data = await useApiFetch("/customer/cart/item-qty", {
					method: HTTP_METHOD.GET
				});
				
				return res_data;
			}

			async get(to_refresh = false) {
				const res_data = await useApiFetch("/customer/cart?refresh=" + to_refresh, {
					method: HTTP_METHOD.GET
				});

				const event = new Event("cart:get");
				document.dispatchEvent(event);

				return res_data;
			}

			async updateItem(configurable_id, variant_id, qty) {
				const res_data = await useApiFetch("/customer/cart/item/update", {
					method: HTTP_METHOD.PUT,
					body: {
						configurable_id: configurable_id,
						variant_id: variant_id,
						qty: qty,
					}
				});

				return res_data;
			}

			async removeLine(quote_line_id) {
				const res_data = await useApiFetch("/customer/cart/line/" + quote_line_id, {
					method: HTTP_METHOD.DELETE
				});
				
				return res_data;
			}

			async loadLineOptions(line_no) {
				return await useApiFetch("/customer/cart/line/options/" + line_no, {
					method: HTTP_METHOD.POST,
				});
			}

			async updateLineOptions(line_no, configurable_id, variant_id, qty) {
				return await useApiFetch("/customer/cart/line/options/" + line_no, {
					method: HTTP_METHOD.PUT,
					body: {
						configurable_id: configurable_id,
						variant_id: variant_id,
						qty: qty,
					}
				});
			}

			async loadPrimaryCoupons() {
				return await useApiFetch("/customer/cart/coupon/primary/load", {
					method: HTTP_METHOD.POST,
				});
			}

			async searchGeneratedCoupon(coupon_code) {
				return await useApiFetch("/customer/cart/coupon/search", {
					method: HTTP_METHOD.POST,
					body: {
						coupon_code: coupon_code
					}
				});
			}

			async applyCoupons(coupon_codes) {
				return await useApiFetch("/customer/cart/coupon/apply", {
					method: HTTP_METHOD.POST,
					body: {
						coupon_codes: coupon_codes
					}
				});
			}

			async loadGiftCombos(gift_rules) {
				return await useApiFetch("/customer/cart/gift-combo/load", {
					method: HTTP_METHOD.POST,
					body: {
						gift_rules: gift_rules
					}
				});
			}

			async selectGiftCombos(quote_id, gift_rules) {
				return await useApiFetch("/customer/cart/gift-combo/select", {
					method: HTTP_METHOD.POST,
					body: {
						quote_id: quote_id,
						gift_rules: gift_rules
					}
				});
			}
			
			async applyExchangePoint(exchanged_points) {
				return await useApiFetch("/customer/loyalty/apply_exchange_point", {
					method: HTTP_METHOD.POST,
					body: {
						exchanged_points: exchanged_points
					}
				});
			}
			async removeExchangePoint() {
				return await useApiFetch("/customer/loyalty/remove_exchange_point", {
					method: HTTP_METHOD.POST,
				});
			}

			async getRedeemablePoints() {
				return await useApiFetch("/customer/loyalty/redeemable-point-used", {
					method: HTTP_METHOD.POST,

				});
			}
			async applySchemeDiscount() {
				return await useApiFetch("/customer/loyalty/apply_schema_discount", {
					method: HTTP_METHOD.POST,
				});
			}
			async applyBirthdayDiscount() {
				return await useApiFetch("/customer/loyalty/apply_birthday_discount", {
					method: HTTP_METHOD.POST,
				});
			}
			async removeBirthdayDiscount() {
				return await useApiFetch("/customer/loyalty/remove_birthday_discount", {
					method: HTTP_METHOD.POST,
				});
			}
			async applyReferralCode(referral_code) {
				return await useApiFetch("/customer/loyalty/apply_referral_code", {
					method: HTTP_METHOD.POST,
					body: {
						referral_code: referral_code
					}
				});
			}
			async removeReferralCode() {
				return await useApiFetch("/customer/loyalty/remove_referral_code", {
					method: HTTP_METHOD.POST,
				});
			}
			async checkNewCustomer() {
				return await useApiFetch("/customer/loyalty/check_new_customer", {
					method: HTTP_METHOD.POST,
				});
			}
		}

		const cart = new Cart();
		return {
			provide: {
				cart: cart,
			},
		};
	},
});
