
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {

		class Form {
			constructor() { }

			async sendForm(params, formData) {
				const res_data = await useApiFetch(params, {
					method: HTTP_METHOD.POST,
					body: formData,
					headers: {
						"Content-Type": "application/json",
					},
				});
				return res_data;
			}

			async sendEmail(params, formData, id) {
				const res_data = await useApiFetch(params, {
					method: HTTP_METHOD.POST,
					body: formData,
					headers: {
						"Content-Type": "application/json",
					},
				});
				return res_data;
			}
			
			async uploadWarrantyRequestFile(params, request_id, file) {
				const formData = new FormData();
				formData.append("id", request_id);
				formData.append("uploaded_file", file);
				const res_data = await useApiFetch(params, {
					method: HTTP_METHOD.POST,
					body: formData,
					headers: {},
				});
				return res_data;
			}

			async uploadFile(params, mediaId, record, file, field) {
				const formData = new FormData();
				formData.append("media_id", mediaId);
				formData.append("record", JSON.stringify(record));
				formData.append("uploaded_file", file);
				formData.append("field", JSON.stringify(field));
				const res_data = await useApiFetch(params, {
					method: HTTP_METHOD.POST,
					body: formData,
					headers: {},
				});
				return res_data;
			}
		}

		const form = new Form();
		return {
			provide: {
				form: form,
			},
		};
	},
});
