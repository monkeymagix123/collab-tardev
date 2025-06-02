<template>
  <div class="flex items-center justify-between p-4 bg-white shadow-lg rounded-xl mb-4 max-w-md mx-auto">
    <div class="text-lg font-semibold text-gray-800">
      Dimension: {{ dimension }}
    </div>
    <button
      @click="buyDimension"
      class="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
    >
      Buy Another Dimension
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Define props for the component
// 'dimension' is a prop to display the current dimension value.
const props = defineProps({
  dimension: Number
});

// Define emits for the component
// 'buy-dimension' is an event that will be emitted when the button is clicked.
const emit = defineEmits(['buy-dimension']);

// Method to handle the button click.
// It emits the 'buy-dimension' event, which the parent component can listen to.
const buyDimension = () => {
  emit('buy-dimension');
};
</script>

<style>
/* Tailwind CSS is used via CDN in the main HTML, so no specific styles here for the component. */
/* However, if you were using a build process, you might include component-specific styles here. */
</style>