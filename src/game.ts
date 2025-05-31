import { createApp, ref, computed } from 'vue';

export class Game {
    /**
     * Defines the reactive state for our simple idle game.
     * `ref` is used to create a reactive reference to a primitive value (like a number).
     * When `coins.value` changes, Vue automatically knows to re-render parts of the UI that depend on it.
     */
    coins = ref(0);

    /**
     * A computed property that calculates coins gained per click.
     * `computed` properties are reactive and automatically re-evaluate when their dependencies change.
     * In this simple example, it's a constant, but it demonstrates the concept.
     */
    coinsPerClick = computed(() => 1);

    constructor() {
        // this.clickForCoins = this.clickForCoins.bind(this);
    }

    /**
     * Function to handle the button click event.
     * Increments the `coins` reactive variable by the `coinsPerClick` amount.
     */
    clickForCoins = () => {
        this.coins.value += this.coinsPerClick.value;
        // console.log(this.coins.value);
    };
}

