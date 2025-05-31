<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4">
      <div class="bg-white/20 backdrop-filter backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-30 w-full max-w-md text-center">
        <h1 class="text-5xl font-bold mb-6 text-shadow-lg">Vue Idle Clicker</h1>
        <p class="text-3xl mb-8">Coins: <span class="font-extrabold text-yellow-300">{{ game.coins }}</span></p>
        <button
          @click="game.clickForCoins"
          class="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-200 ease-in-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-75 text-2xl"
        >
          Click for {{ game.coinsPerClick }} Coin{{ game.coinsPerClick === 1 ? '' : 's' }}
        </button>
      </div>
    </div>
</template>

<script setup lang="ts">
    import game from './setup';
    import Button from './components/Button.vue';
</script>

<style src="./assets/tailwind.css"></style>
<!-- <style scoped>
    @reference "./assets/tailwind.css";

    button {
        @apply bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-200 ease-in-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-75 text-2xl
    }
</style> -->