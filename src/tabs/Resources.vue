<template>
    <div class="h-full flex flex-col items-center justify-top">
      <h1 class="text-5xl font-bold mb-6 text-shadow-lg">
        Vue Idle Clicker
      </h1>
      <p class="mb-8">
        You have
        <span class="font-extrabold text-yellow-300 number-display">{{ styler.writeNumber(game.coins.value) }}</span>
        antimatter.
      </p>

      <p class="text-3xl mb-8">
        Dimensions: <span class="font-extrabold text-yellow-300">{{ game.dimensions.value[0] }}</span>
      </p>

      <YellowButton @click="game.buyDimension()">
        <p> Buy 1
          for <span class="font-extrabold">{{ game.calculateDimensionCost().value.toLocaleString() }}</span> antimatter
        </p>
      </YellowButton>

      <DimensionsRow
        :dimension="1"
        :on-buy-click="game.buyDimension()"
      />
      <DimensionsRow
        :dimension="2"
        :on-buy-click="game.buyDimension()"
      />
    </div>
</template>

<script setup lang="ts">
    import game from '../setup';
    import YellowButton from '../components/YellowButton.vue';
    import { styler } from '../styler';
    import DimensionsRow from '../components/DimensionsRow.vue';
</script>