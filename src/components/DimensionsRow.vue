<template>
  <div class="flex w-full items-center justify-between p-4 shadow-lg rounded-xl mb-4 max-w-3xl mx-auto">
    <div class="flex-2 text-lg font-semibold">
        <span> number of dimensions </span> <span>{{ styler.endInt(dimension) }}</span> Antimatter Dimension
    </div>
    <button
      @click="handleButtonClick"
      class="flex-1 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
    >
      Buy Another Dimension
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { styler } from '../styler';

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