<template>
	<div class="h-full flex flex-col items-center justify-start">
		<h1 class="text-5xl font-bold mb-6 text-shadow-lg">Idle Clicker</h1>
		<p class="mb-4">
			You have
			<span class="font-extrabold text-yellow-300 number-display large">{{
				game.getCoins()
			}}</span>
			antimatter.
		</p>

		<div class="group relative inline-block">
			<button
				@click="game.buyTickspeed"
				class="w-full px-6 py-2 text-white font-bold rounded-lg shadow-md"
				v-bind:disabled="!game.canBuyTickspeed()"
				v-bind:class="
					game.canBuyTickspeed()
						? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105'
						: 'bg-blue-800/70'
				"
			>
				Buy 1 for
				<span>
					{{ styler.writeNumber(game.calculateTickspeedCost()) }}
				</span>
			</button>

			<div
				class="opacity-0 z-50 group-hover:opacity-100 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max p-2 bg-black text-white text-sm rounded-md transition-opacity duration-300 pointer-events-none"
			>
				Purchased
				<span class="number-display">{{ game.tickspeed }}</span> times
			</div>
		</div>

		<YellowButton @click="game.buyMax"> Buy Max (M) </YellowButton>
		<div
			class="flex-1 min-h-0 w-full flex-col items-center justify-between p-4 shadow-lg rounded-xl mb-4 mx-auto overflow-y-auto"
		>
			<DimensionsRow
				v-for="i in Config.dimensions"
				:key="i"
				:dimension="i - 1"
				:on-buy-click="() => game.buyDimension(i - 1)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import game from '../setup';
	import YellowButton from '../components/YellowButton.vue';
	import DimensionsRow from '../components/DimensionsRow.vue';
	import { styler } from '../styler';
	import { Config } from '../config';
</script>
