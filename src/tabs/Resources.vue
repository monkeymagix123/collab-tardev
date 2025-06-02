<template>
    <div class="h-full flex flex-col items-center justify-center">
      <h1 class="text-5xl font-bold mb-6 text-shadow-lg">Vue Idle Clicker</h1>
      <p class="text-3xl mb-8">Coins: <span class="font-extrabold text-yellow-300 number-display">{{ game.coinsRef }}</span></p>

      <p class="text-3xl mb-8">Dimensions: <span class="font-extrabold text-yellow-300">{{ game.dimensions.value[0] }}</span></p>

      <YellowButton @click="game.buyDimension()">
        Buy a dimension for {{ game.calculateDimensionCost().value.toLocaleString() }} Coin{{ game.calculateDimensionCost().value === 1 ? '' : 's' }}
      </YellowButton>
    </div>
</template>

<script setup lang="ts">
    import game from '../setup';
    import YellowButton from '../components/YellowButton.vue';
</script>