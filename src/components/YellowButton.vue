<template>
	<button :class="buttonClasses" @click="$emit('click')">
		<slot>a button</slot>
	</button>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	const emit = defineEmits(['click']);

	// All Tailwind utility classes are used directly
	// const baseClasses = 'font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-200 ease-in-out active:scale-95 focus:outline-none text-2xl';
	// const buttonClasses = computed(() => {
	//   return `${baseClasses} bg-yellow-400 hover:bg-yellow-500 text-purple-900 focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-75`;
	// });
	// const buttonClasses = 'bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-200 ease-in-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-75 text-2xl';
	const buttonClasses =
		'bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-4 px-8 rounded-2xl shadow-lg transform transition-all duration-200 ease-in-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-75 text-2xl';
</script>

<script lang="ts">
	export default {
		name: 'YellowButton',
	};
</script>

<!-- <template>
  <button
    class="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-200 ease-in-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-75 text-2xl"
    @click="$emit('click')">
    <slot>Button</slot>
  </button>
</template> -->
