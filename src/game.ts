import { createApp, ref, computed, reactive } from 'vue';
import { Config } from './config';
import { styler } from './styler';

export class Game {
    /**
     * Defines the reactive state for our simple idle game.
     * `ref` is used to create a reactive reference to a primitive value (like a number).
     * When `coins.value` changes, Vue automatically knows to re-render parts of the UI that depend on it.
     */
    coins = ref(Config.startCoins);

    dimensions = reactive(new Array(8).fill(0));
    dimBought = reactive(new Array(8).fill(0));
    // dimRef = reactive(new Array(8));

    time: number = -1;

    /**
     * A computed property that calculates coins gained per click.
     * `computed` properties are reactive and automatically re-evaluate when their dependencies change.
     * In this simple example, it's a constant, but it demonstrates the concept.
     */
    coinsPerClick = computed(() => 1);

    constructor() {
        // load save data
        let localSave = localStorage.getItem("saveData");
        if (localSave) {
            this.load(JSON.parse(localSave));
        }
        
        // calculate offline progress
        if (this.time != -1)
            this.update((Date.now() - this.time) / 1000);

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
        this.coins.value += this.coinsPerClick.value;
        // console.log(this.coins.value);
    };

    doUpdate() {
        const dt = Date.now() - this.time;
        this.update(dt / 1000);
        this.time = Date.now();
    }

    update(dt: number) {
        // cap 24 hrs offline time
        dt = Math.min(dt, 60 * 60 * 24);

        this.coins.value += this.dimensions[0] * dt;
        // reverse ig
        // Iterate backwards from the second-highest dimension (index 7) down to the second dimension (index 1)
        for (let i = this.dimensions.length - 1; i > 0; i--) {
            // Each dimension produces the one below it
            this.dimensions[i - 1] += this.dimensions[i] * dt;
        }
    }

    calculateDimensionCost (i: number) {
        return Math.round(Config.baseDimCost * Math.pow(Config.scale, this.dimBought[i]));
    }

    canBuyDimension(i: number) {
        const nextCost = this.calculateDimensionCost(i);
        return (this.coins.value >= nextCost);
    }

    buyDimension(i: number) {
        const nextCost = this.calculateDimensionCost(i);
        if (this.canBuyDimension(i)) {
            this.dimensions[i]++;
            this.dimBought[i]++;
            this.coins.value -= nextCost;
        }
    }

    getCoins() {
        return styler.writeNumber(this.coins.value);
    }

    // getDim(d: number) {
    //     // d is integer
    //     this.dimRef[d] ??= ref(this.dimensions[d]);
    //     return this.dimRef[d];
    // }

    save() {
        localStorage.setItem("saveData", JSON.stringify(this.getSave()));
    }

    exportSave() {
        // const s = Buffer.from(JSON.stringify(this.getSave())).toString("base64");
        const json = JSON.stringify(this.getSave());
        const utf8Bytes = new TextEncoder().encode(json);
        const base64 = btoa(String.fromCharCode(...utf8Bytes));
        return base64;
    }

    importSave(base64: string) {
        const binary = atob(base64);
        const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
        const json = new TextDecoder().decode(bytes);
        return JSON.parse(json);
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

