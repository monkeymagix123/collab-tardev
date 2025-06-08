<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-x-4"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 translate-x-4"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-3 z-50"
    >
      <svg
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div>
        <p class="font-semibold">{{ currentTitle }}</p>
        <p class="text-sm">{{ currentMessage }}</p>
      </div>
      <button @click="hideNotification" class="ml-4 text-white hover:text-green-100">
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Define props using defineProps
// const props = defineProps({
//   title: {
//     type: String,
//     default: 'Success!'
//   },
//   message: {
//     type: String,
//     default: 'Your action was successful.'
//   },
//   duration: {
//     type: Number,
//     default: 3000 // 3 seconds
//   }
// });
const props = defineProps({
  title: String,
  message: String,
  duration: Number,
});

// Reactive state variables
const isVisible = ref(false);
const timeoutId = ref(null);
const currentTitle = ref(props.title);
const currentMessage = ref(props.message);
const currentDuration = ref(props.duration);

// Methods
const showNotification = (options = {}) => {
  currentTitle.value = options.title || props.title;
  currentMessage.value = options.message || props.message;
  currentDuration.value = options.duration !== undefined ? options.duration : props.duration;

  isVisible.value = true;

  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
  }

  if (currentDuration.value > 0) {
    timeoutId.value = setTimeout(() => {
      hideNotification();
    }, currentDuration.value);
  }
};

const hideNotification = () => {
  isVisible.value = false;
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
    timeoutId.value = null;
  }
};

// Lifecycle hooks for cleanup
onUnmounted(() => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
  }
});

// Expose the showNotification and hideNotification methods to the parent
defineExpose({
  showNotification,
  hideNotification
});
</script>

<style scoped>
/* No specific styles needed here as Tailwind handles most of it */
</style>