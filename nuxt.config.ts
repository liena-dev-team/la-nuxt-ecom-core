// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from "./package.json"
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  components: [
    { path: './components', pathPrefix: false }
  ],
  plugins: [
    './app/plugins/*'
  ],
  devtools: { enabled: true },
  app: {
		head: {
			meta: [
				{ name: 'google-site-verification', content: process.env.GOOGLE_SITE_VERIFICATION || "" }
			]
		}
	},
	css: [
		"~/assets/css/import.less",
	],
	vite: {
		css: {
			preprocessorOptions: {
				less: {
					additionalData: '@import "@/assets/css/preprocess.less";',
				},
			},
		},
		// server: {
		// 	allowedHosts: [
		// 		"localhost",
		// 		"127.0.0.1",
		// 		"9091-118-69-171-55.ngrok-free.app"
		// 	]
		// }
	},
	runtimeConfig: {
		public: {
			appVersion: pkg.version,
			environment: process.env.ENVIRONMENT || "",
			baseUrl: process.env.BASE_URL || "",
			apiHost: process.env.API_HOST || "http://127.0.0.1/rest/V1",
			mediaHost: process.env.MEDIA_HOST,
			recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || "",
			// scripts: {
			// 	googleAnalytics: {
			// 		id: process.env.NUXT_PUBLIC_SCRIPTS_GOOGLE_ANALYTICS_ID
			// 	}
			// }
			googleSignIn: {
				clientId: process.env.GOOGLE_CLIENT_ID
			}
		}
	},
	modules: [
		"@nuxt/image", "@nuxtjs/i18n",
		"@nuxtjs/device", "@pinia/nuxt", "nuxt-multi-cache",
		"@posthog/nuxt"
	],
	posthogConfig: {
		publicKey: process.env.POSTHOG_API_KEY || "",
		host: process.env.POSTHOG_HOST || "https://us.i.posthog.com",
		clientConfig: {
			autocapture: true,
		},
	},
	nitro: {
		routeRules: {
			// Proxy this path to Api Server
			'/backend_api/**': {
				proxy: {
					to: process.env.API_HOST + '/**'
				}
			},
			// Proxy this path to Api Server's Media folder
			'/media/**': {
				proxy: {
					to: process.env.API_HOST + '/media/**' // make sure this is an ENV driven variable if production does not match
				}
			},
			// Proxy file robots.txt
			'/robots.txt': {
				proxy: {
					to: process.env.API_HOST + '/robots.txt'
				}
			},
			// Proxy sitemap files
			'/sitemap.xml': {
				proxy: {
					to: process.env.API_HOST + '/sitemap.xml'
				}
			},
			'/cores-page.xml': {
				proxy: {
					to: process.env.API_HOST + '/cores-page.xml'
				}
			},
			'/product.xml': {
				proxy: {
					to: process.env.API_HOST + '/product.xml'
				}
			},
			'/blog.xml': {
				proxy: {
					to: process.env.API_HOST + '/blog.xml'
				}
			},
			// Cache Control
			'/**/*.{js,css,png,jpg,jpeg,gif,svg,ico,woff2,mp3,mp4}': {
				headers: {
					'Cache-Control': 'public, max-age=86400, '
				}
			},
			'/_nuxt/**': {
				headers: {
					'Cache-Control': 'public, max-age=86400, '
				}
			},
			'/images/**': {
				headers: {
					'Cache-Control': 'public, max-age=86400' // 1 day
				}
			}
		}
	},
	image: {
		format: ['avif', 'jpg'],
		domains: [
			'localhost', 'localhost:3000', 'localhost:3001', 'localhost:3002', '192.168.3.224:3000', '192.168.3.224:8002',
			'192.168.3.224:8082', '192.168.3.224:8083'
		],
	},
	multiCache: {
		route: {
			enabled: true,
		},
		api: {
			enabled: true,
			prefix: '/__nuxt_multi_cache',
			authorization: process.env.NUXT_MULTI_CACHE_TOKEN ?? '',
			cacheTagInvalidationDelay: 60000
		}
	},
	i18n: {
		strategy: 'no_prefix',
		defaultLocale: 'vn',
		locales: [
			{ code: 'vn', name: 'Việt Nam', file: 'vn.json' },
			{ code: 'en', name: 'English', file: 'en.json' },
		]
	},
	hooks: {
		"build:manifest": (manifest) => {
			Object.values(manifest).forEach((entry) => {
				if (entry.isEntry) {
					entry.css = [];
				}
			});
		},
	},
})
