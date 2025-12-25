
export default defineNuxtPlugin({
	parallel: true,
	async setup(nuxtApp) {
		const seo_store = useSeoStore();
		const config = useRuntimeConfig();
		const router = useRouter();

		class RoutePage {
			constructor() { }

			async view(request_url = "") {
				const url = "/public/seo/page/view?url=" + request_url;
				return await useApiFetch(
					url, {
					method: HTTP_METHOD.GET
				});
			}
			
			initSetup(seo_data) {
				const init_result = this.tryToSetup(seo_data);
				if (!init_result) {
					seo_store.site_config = null;
					seo_store.route_page = null;
					seo_store.page_data = null;
				}
			}

			tryToSetup(seo_data) {
				try {
					if (!seo_data || !seo_data.result) {
						return false;
					}
					
					// Check URL redirect
					const url_redirect = seo_data.url_redirect;
					if (url_redirect) {
						navigateTo("/" + url_redirect.target_path, { redirectCode: url_redirect.redirect_type });
						return false;
					}

					seo_store.site_config = seo_data.site_config;
					seo_store.route_page = seo_data.route_page;
					seo_store.page_data = seo_data.page_data;

					// Set Page data
					if (!seo_store.route_page || !seo_store.site_config) {
						return;
					}

					// Setup SEO: Get page SEO or fallback to Site Default Configuration
					// Page Url
					let page_url = config.public.baseUrl + '/' + seo_store.route_page.url_path;
					// const page_url = config.public.baseUrl + route.path;
					// Robots
					let robots = seo_store.route_page.robots || seo_store.site_config.robots;
					if (robots == "default") {
						robots = seo_store.site_config.robots;
					}

					// Meta Title
					let meta_title = seo_store.route_page.meta_title || seo_store.site_config.meta_title;
					// Meta Description
					let meta_description = seo_store.route_page.meta_description || seo_store.site_config.meta_description;
					// Meta Keywords
					let meta_keywords = seo_store.route_page.meta_keywords || seo_store.site_config.meta_keywords;
					// Canonical
					let canonical = seo_store.route_page.canonical || seo_store.route_page.url_path; // Use saved canonical or url_path
					canonical = config.public.baseUrl + "/" + canonical;
					// og:image
					let og_image_url = seo_store.route_page.og_image_url || "images/seo/meta_tag_image_default.jpg";
					og_image_url = config.public.baseUrl + "/" + og_image_url;
					// og:image_width
					let og_image_width = seo_store.route_page.og_image_width || 256;
					// og:image_height
					let og_image_height = seo_store.route_page.og_image_height || 256;

					let og_type = "website";
					switch (seo_store.route_page.type) {
						case PAGE_TYPE.CMS_PAGE:
						case PAGE_TYPE.PRODUCT_CONFIGURABLE:
						case PAGE_TYPE.PRODUCT_CATEGORY:
						case PAGE_TYPE.BLOG_CATEGORY:
						case PAGE_TYPE.BLOG_POST:
							og_type = "article";
							break;
					}

					let all_scripts = [
						{
							innerHTML: seo_store.site_config.header_script || "",
						}
					];

					const schema_scripts = this.makeSchemaScripts();
					if (schema_scripts.length > 0) {
						all_scripts = all_scripts.concat(schema_scripts);
					}

					// Set SEO
					useHead({
						title: meta_title,
						htmlAttrs: {
							lang: seo_store.site_config.language,
						},
						viewport: "width=device-width, initial-scale=1",
						meta: [
							{
								name: 'robots',
								content: robots
							}, {
								name: 'title',
								content: meta_title
							}, {
								name: 'description',
								content: meta_description
							}, {
								name: 'keywords',
								content: meta_keywords
							}, {
								property: 'og:locale',
								content: seo_store.site_config.locale
							}, {
								property: 'og:site_name',
								content: seo_store.site_config.site_name
							}, {
								property: 'og:type',
								content: og_type
							}, {
								property: 'og:title',
								content: meta_title
							}, {
								property: 'og:description',
								content: meta_description
							}, {
								property: 'og:url',
								content: page_url
							}, {
								property: 'og:image',
								content: og_image_url
							}, {
								property: 'og:image:width',
								content: og_image_width
							}, {
								property: 'og:image:height',
								content: og_image_height
							},
						],
						link: [
							{
								rel: 'canonical',
								href: canonical
							}
						],
						script: all_scripts,
						style: [
							{
								textContent: seo_store.site_config.header_style || "",
							},
						]
					})

					return true;
				} catch (e) {
					console.log(e);
					return false;
				}
			}

			makeSchemaScripts() {
				const all_scripts = [];
				let static_schema_graphs = [];
				try {
					if (seo_store.route_page?.schema_graphs) {
						static_schema_graphs = JSON.parse(seo_store.route_page.schema_graphs);
					}
				} catch (e) {
					static_schema_graphs = [];
				}

				if (Array.isArray(static_schema_graphs)) {
					static_schema_graphs.forEach(graph => {
						all_scripts.push({
							type: "application/ld+json",
							innerHTML: JSON.stringify(graph)
						});
					});
				}

				if (seo_store.page_data) {
					const dynamic_schema_graphs = seo_store.page_data.schema_graphs || [];
					if (Array.isArray(dynamic_schema_graphs) && dynamic_schema_graphs.length > 0) {
						dynamic_schema_graphs.forEach(graph => {
							all_scripts.push({
								type: "application/ld+json",
								innerHTML: JSON.stringify(graph)
							});
						});
					}
				}

				return all_scripts;
			}

		}

		const route_page = new RoutePage();
		return {
			provide: {
				route_page: route_page,
			},
		};
	}
});
