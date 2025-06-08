<template>
  <div class="h-full flex flex-col items-center justify-start">
    <h1 class="text-5xl font-bold mb-6 text-shadow-lg">
      Idle Clicker
    </h1>
    <p class="mb-8">
      You have
      <span class="font-extrabold text-yellow-300 number-display large">{{ game.getCoins() }}</span>
      antimatter.
    </p>

    <div class="flex-1 min-h-0  w-full flex-col items-center justify-between p-4 shadow-lg rounded-xl mb-4 mx-auto overflow-y-auto">
      <DimensionsRow
        v-for="i in 8"
        :key="i"
        :dimension="i - 1"
        :on-buy-click="() => game.buyDimension(i - 1)"
      />
    </div>
  </div>
</template>

<script setup>
    import game from '../setup';
    import YellowButton from '../components/YellowButton.vue';
    import { styler } from '../styler';
    import DimensionsRow from '../components/DimensionsRow.vue';
</script>