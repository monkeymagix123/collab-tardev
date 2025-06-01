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

    time: number;

    /**
     * A computed property that calculates coins gained per click.
     * `computed` properties are reactive and automatically re-evaluate when their dependencies change.
     * In this simple example, it's a constant, but it demonstrates the concept.
     */
    coinsPerClick = computed(() => 1);

    constructor() {
        // calculate offline progress

        // load save data
        let localSave = localStorage.getItem("saveData");
        if (localSave) {
            this.load(JSON.parse(localSave));
        }

        // this.clickForCoins = this.clickForCoins.bind(this);
        this.time = Date.now();

        this.save();

        setInterval(() => this.doUpdate(), 33);
        // setInterval(() => this.save(), 1000 * 20); // show game saved message?
        setInterval(() => this.save(), 33);
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
        return computed(() => this.coins.toPrecision(3));;
    }

    doUpdate() {
        const dt = Date.now() - this.time;
        this.update(dt / 1000);
        this.time = Date.now();
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

    save() {
        localStorage.setItem("saveData", JSON.stringify(this.getSave()));
    }

    getSave(): Record<string, any> {
        const result: Record<string, any> = {};
        for (const key in this) {
            const val = this[key];
            if (val && typeof val === 'object' && 'value' in val) {
                result[key] = val.value;
            } else if (val) {
                result[key] = val;
            }
        }
        return result;
    }

    load(data: Record<string, any>) {
        // return Object.assign(this, data);
        for (const key in data) {
            if (key in this) {
                const typedKey = key as keyof Game;

                const prop = this[typedKey];
                if (prop && typeof prop === 'object' && 'value' in prop) {
                    (prop as { value: any }).value = data[key];
                } else {
                    (this as any)[key] = data[key]; // fallback for non-ref fields
                }
            }
        }
    }
}

