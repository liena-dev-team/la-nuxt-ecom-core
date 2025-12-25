
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {
		
		class Review {
			constructor() { }

			async filter(formData) {
				// if (!filter_request) {
				//   return;
				// }

				const res_data = await useApiFetch("/customer/review/summary", {
					method: HTTP_METHOD.POST,
					body: formData,
					headers: {
						"Content-Type": "application/json",
					},
				});

				return res_data;
			}

			async submitReview(formData) {
				const res_data = await useApiFetch("/customer/review/submit", {
					method: HTTP_METHOD.POST,
					body: formData,
					headers: {
						"Content-Type": "application/json",
					},
				});
				return res_data;
			}

			async uploadFile(review_id, files) {
				const formData = new FormData();
				formData.append("review_id", review_id);
				for (const file of files) {
					formData.append("files[]", file);
				}
				const res_data = await useApiFetch("/customer/review/upload-file", {
					method: HTTP_METHOD.POST,
					body: formData,
					headers: {},
				});
				return res_data;
			}

			async getTopFeaturedPosts() {
				const res_data = await useApiFetch(
					"/public/review/top-featured-posts",
					{
						method: HTTP_METHOD.GET,
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				return res_data;
			}
		}

		const review = new Review();
		return {
			provide: {
				review: review,
			},
		};
	},
});
