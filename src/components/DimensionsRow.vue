<template>
	<!-- <div class="flex w-full items-center justify-between p-4 shadow-lg rounded-xl mb-4 mx-auto"> -->
	<!-- <div class="flex w-full items-center p-2 rounded-lg border border-gray-300"> -->
	<div
		class="flex w-full items-center p-2 rounded-lg bg-gradient-to-r from-blue-700/30 via-purple-700/30 to-blue-700/30 rounded-lg mb-3"
	>
		<div class="flex-[2] text-lg font-semibold">
			<span>{{ styler.endInt(dimension! + 1) }}</span> Antimatter Dimension
		</div>
		<div class="flex-1 text-lg font-semibold">
			<span class="font-normal">&times;</span
			><span class="number-display">
				{{ styler.writeNumber(game.calculateDimMultiplier(dimension!)) }}
			</span>
		</div>
		<div class="flex-1 text-lg font-semibold">
			<span class="number-display">
				{{ styler.writeNumber(game.dimensions[dimension!]) }}
			</span>
		</div>
		<div class="flex-[1.5] group relative inline-block">
			<button
				@click="handleButtonClick"
				class="w-full px-6 py-2 text-white font-bold rounded-lg shadow-md"
				v-bind:disabled="!game.canBuyDimension(dimension!)"
				v-bind:class="
					game.canBuyDimension(dimension!)
						? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105'
						: 'bg-blue-800/70'
				"
			>
				Buy 1 for
				<span>
					{{ styler.writeNumber(game.calculateDimensionCost(dimension!)) }}
				</span>
			</button>

			<div
				class="opacity-0 z-50 group-hover:opacity-100 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max p-2 bg-black text-white text-sm rounded-md transition-opacity duration-300 pointer-events-none"
			>
				Purchased
				<span class="number-display">{{ game.dimBought[dimension!] }}</span> times
			</div>
		</div>
		<p></p>
	</div>
</template>

<script setup lang="ts">
	import { styler } from '../styler';
	import game from '../setup';

	// Define props for the component
	// 'dimension' is a prop to display the current dimension value.
	// 'onBuyClick' is a new prop that expects a Function. This will be the custom click handler.
	const props = defineProps({
		dimension: Number,
		onBuyClick: Function, // Define the prop as a Function type
	});

	// Method to handle the button click.
	// It now calls the 'onBuyClick' function passed via props, if it exists.
	const handleButtonClick = () => {
		if (props.onBuyClick) {
			props.onBuyClick(); // Execute the custom function provided by the parent
		}
	};
</script>

<style>
	/* Tailwind CSS is used via CDN in the main HTML, so no specific styles here for the component. */
	/* However, if you were using a build process, you might include component-specific styles here. */
</style>
