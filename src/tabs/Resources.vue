<template>
    <div class="h-full flex flex-col items-center justify-center">
      <h1 class="text-5xl font-bold mb-6 text-shadow-lg">Vue Idle Clicker</h1>
      <p class="text-3xl mb-8">Coins: <span class="font-extrabold text-yellow-300 number-display">{{ game.coinsRef }}</span></p>
      
      <!-- <button
        @click="game.clickForCoins"
        class="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-200 ease-in-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-75 text-2xl"
      >
        Click for {{ game.coinsPerClick }} Coin{{ game.coinsPerClick === 1 ? '' : 's' }}
      </button> -->

      <p class="text-3xl mb-8">Dimensions: <span class="font-extrabold text-yellow-300">{{ game.dimensions.value[0] }}</span></p>

      <button
        @click="game.buyDimension"
        class="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-200 ease-in-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-75 text-2xl"
      >
        Buy a dimension for {{ game.calculateDimensionCost().value.toLocaleString() }} Coin{{ game.calculateDimensionCost().value === 1 ? '' : 's' }}
      </button>
    </div>
</template>

<script setup lang="ts">
    import game from '../setup';
    import Button from '../components/Button.vue';
</script>