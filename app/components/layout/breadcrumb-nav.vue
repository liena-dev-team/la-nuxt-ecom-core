<template>
	<div class="la-breadcrumb-navigation" v-if="nav">
		<ul>
			<li v-for="(item, index) in breadcrumbs">
				<nuxt-link v-if="item.url_path" :to="item.url_path" :title="item.name">
					<span>{{ item.name }}</span>
				</nuxt-link>
				<span v-else style="display: none">{{ item.name }}</span>
			</li>
		</ul>
	</div>
</template>

<script setup>

//Props
const { nav } = defineProps({
	nav: {
		type: Object,
		default: null
	}
});

const breadcrumbs = nav?.breadcrumbs || [];

</script>

<style lang="less">
.la-breadcrumb-navigation {
	padding-left: 16px;
	padding-right: 16px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 16px;
	margin-bottom: 16px;
	width: 100%;
	max-width: @la_layout_content_max_width;
	box-sizing: border-box;

	@media (max-width: @screen__m) {
		padding-left: 8px;
		padding-right: 8px;
		margin-top: 8px;
		margin-bottom: 8px;
		font-size: 12px;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		margin: 0px;
		padding: 0px;

		li {
			display: inline-flex;
			margin: 0px;
			padding: 0px;
			line-height: 2em;

			@media (min-width: @screen__m) {
				padding: 0px 10px 0px 0px;
			}

			a {
				color: #282828;
				margin-left: 10px;
			}

			span.last {
				margin-left: 10px;
			}

			&:not(:first-child):before {
				display: inline-block;
				font-family: "font-icon";
				font-style: normal;
				font-weight: 400;
				content: "|";
				font-size: 12px;
				margin: 0 4px;

				@media (min-width: @screen__m) {
					margin: 0 10px;
				}
			}

			&:last-child {
				color: @la_color_primary;
			}
		}
	}
}
</style>
