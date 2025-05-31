import { createApp, ref, computed, reactive } from 'vue';
import { Config } from './config';

export class Game {
    /**
     * Defines the reactive state for our simple idle game.
     * `ref` is used to create a reactive reference to a primitive value (like a number).
     * When `coins.value` changes, Vue automatically knows to re-render parts of the UI that depend on it.
     */
    coins = Config.startCoins;
    coinsRef = ref(this.coins.toPrecision(3));

    dimensions = ref(new Array(8).fill(0));
    // dimRef = reactive(new Array(8));

    /**
     * A computed property that calculates coins gained per click.
     * `computed` properties are reactive and automatically re-evaluate when their dependencies change.
     * In this simple example, it's a constant, but it demonstrates the concept.
     */
    coinsPerClick = computed(() => 1);

    constructor() {
        // this.clickForCoins = this.clickForCoins.bind(this);
        setInterval(() => this.update(0.033), 33);
    }

    /**
     * Function to handle the button click event.
     * Increments the `coins` reactive variable by the `coinsPerClick` amount.
     */
    clickForCoins = () => {
        this.coins += this.coinsPerClick.value;
        // console.log(this.coins.value);
    };

    getCoins() {
        return ref(this.coins.toPrecision(3));
    }

    update(dt: number) {
        this.coins += this.dimensions.value[0] * dt;
        this.coinsRef.value = this.coins.toPrecision(3);
    }

    calculateDimensionCost() {
        return ref(Math.round(Config.baseDimCost * Math.pow(Config.scale, this.dimensions.value[0])));
    }

    buyDimension() {
        const nextCost = this.calculateDimensionCost().value;
        if (this.coins >= nextCost) {
            this.dimensions.value[0]++;
            this.coins -= nextCost;
        }
    }

    // getDim(d: number) {
    //     // d is integer
    //     this.dimRef[d] ??= ref(this.dimensions[d]);
    //     return this.dimRef[d];
    // }
}

