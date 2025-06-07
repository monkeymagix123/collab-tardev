<template>
  <!-- <div class="flex w-full items-center justify-between p-4 shadow-lg rounded-xl mb-4 mx-auto"> -->
  <!-- <div class="flex w-full items-center p-2 rounded-lg border border-gray-300"> -->
  <div class="flex w-full items-center p-2 rounded-lg  bg-gradient-to-r from-blue-700/50 via-purple-700/50 to-blue-700/50 border border-gray-700 rounded-lg mb-3">
    <div class="flex-2 text-lg font-semibold">
        <span>{{ styler.endInt(dimension + 1) }}</span> Antimatter Dimension
    </div>
    <div class="flex-1 text-lg font-semibold">
      <span class="number-display"> {{ styler.writeNumber(game.dimensions[dimension]) }} </span> [{{ styler.writeNumber(game.dimBought[dimension]) }}]
    </div>
    <button
      @click="handleButtonClick"
      class="flex-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
    >
      Buy Another Dimension for <span> {{ styler.writeNumber(game.calculateDimensionCost(dimension)) }} </span>
    </button>
    <p></p>
  </div>
</template>

<script setup>
import { styler } from '../styler';
import game from '../setup';

// Define props for the component
// 'dimension' is a prop to display the current dimension value.
// 'onBuyClick' is a new prop that expects a Function. This will be the custom click handler.
const props = defineProps({
  dimension: Number,
  onBuyClick: Function // Define the prop as a Function type
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