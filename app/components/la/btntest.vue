<template>
	<button :class="{ 'la-btn': true, disabled: is_disabled, loading: is_loading }" :disabled="is_disabled"
		@click="onClick">
		<div v-if="is_loading">
			<i class="fa-solid fa-spinner"></i>
		</div>
		<slot v-else></slot>
	</button>
</template>

<script setup>


import { ref, defineEmits } from 'vue'
// Props
const { is_disabled, is_loading } = defineProps({
	is_disabled: {
		type: Boolean,
		default: false
	},
	is_loading: {
		type: Boolean,
		default: false
	},
})

const btnRef = ref(true)
const emit = defineEmits(['click'])

function onClick(e) {
	btnRef.value = !btnRef.value
	console.log("ref", btnRef.value);
	emit('click', e)
}

</script>
