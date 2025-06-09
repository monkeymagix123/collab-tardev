import { ref, computed, reactive } from 'vue';
import { Config } from './config';
import { styler } from './styler';

export class Game {
	/**
	 * Defines the reactive state for our simple idle game.
	 * `ref` is used to create a reactive reference to a primitive value (like a number).
	 * When `coins.value` changes, Vue automatically knows to re-render parts of the UI that depend on it.
	 */
	coins = ref(Config.startCoins);

	tickspeed = ref(1);

	dimensions = reactive(new Array(Config.dimensions).fill(0));
	dimBought = reactive(new Array(Config.dimensions).fill(0));

	time: number = -1;

	// intervals
	autoSaveInterval: NodeJS.Timeout;
	updateInterval: NodeJS.Timeout;

	/**
	 * A computed property that calculates coins gained per click.
	 * `computed` properties are reactive and automatically re-evaluate when their dependencies change.
	 * In this simple example, it's a constant, but it demonstrates the concept.
	 */
	coinsPerClick = computed(() => 1);

	constructor() {
		// load save data
		const localSave = localStorage.getItem('saveData');
		if (localSave) {
			this.load(JSON.parse(localSave));
		}

		// calculate offline progress
		if (this.time != -1) this.update((Date.now() - this.time) / 1000);

		// this.clickForCoins = this.clickForCoins.bind(this);
		this.time = Date.now();

		this.save();

		this.updateInterval = setInterval(() => this.doUpdate(), 33);
		// setInterval(() => this.save(), 1000 * 20); // show game saved message?
		this.autoSaveInterval = setInterval(() => this.save(), 33);
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

		this.coins.value += this.dimensions[0] * dt * this.calculateDimMultiplier(0);
		// reverse ig
		// Iterate backwards from the second-highest dimension (index 7) down to the second dimension (index 1)
		for (let i = this.dimensions.length - 1; i > 0; i--) {
			// Each dimension produces the one below it
			this.dimensions[i - 1] +=
				this.dimensions[i] * dt * this.calculateDimMultiplier(i);
		}
	}

	buyMax = () => {
		while (this.canBuyTickspeed()) {
			this.buyTickspeed();
		}
		
		// do cheapest
		while (true) {
			let minCost = Number.MAX_VALUE;
			let cheapest = 0;

			for (let i = 0; i < this.dimensions.length; i++) {
				const c = this.calculateDimensionCost(i);
				if (c < minCost) {
					cheapest = i;
					minCost = c;
				}
			}

			if (minCost > this.coins.value) {
				return;
			}

			this.buyDimension(cheapest);
		}
	};

	calculateDimMultiplier(i: number) {
		const m = Math.pow(1.02, this.dimBought[i]);
		const t = Math.pow(Config.tickspeedMultiplier, this.tickspeed.value);
		return m * t;
	}

	calculateTickspeedCost() {
		return Math.round(Config.tickspeedBaseCost * Math.pow(Config.tickspeedScale, this.tickspeed.value));
	}

	canBuyTickspeed() {
		const nextCost = this.calculateTickspeedCost();
		return this.coins.value >= nextCost;
	}

	buyTickspeed() {
		const nextCost = this.calculateTickspeedCost();
		if (this.canBuyTickspeed()) {
			this.tickspeed.value++;
			this.coins.value -= nextCost;
		}
	}

	calculateDimensionCost(i: number) {
		return Math.round(
			Math.pow(Config.baseDimCost, i + 1) * Math.pow(Config.baseDimCost, Math.floor(i / 3)) * Math.pow(Config.scale, this.dimBought[i])
		);
	}

	canBuyDimension(i: number) {
		const nextCost = this.calculateDimensionCost(i);
		return this.coins.value >= nextCost;
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
		localStorage.setItem('saveData', JSON.stringify(this.getSave()));
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
		const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
		const json = new TextDecoder().decode(bytes);
		return JSON.parse(json);
	}

	getSave(): Record<string, unknown> {
		const result: Record<string, unknown> = {};
		for (const key in this) {
			if (key.includes('interval')) {
				continue;
			}

			const val = this[key];
			if (val && typeof val === 'object' && 'value' in val) {
				result[key] = val.value;
			} else if (val) {
				result[key] = val;
			}
		}
		return result;
	}

	load(data: Record<string, unknown>) {
		// return Object.assign(this, data);
		for (const key in data) {
			if (key in this) {
				const typedKey = key as keyof Game;

				const prop = this[typedKey];
				if (prop && typeof prop === 'object' && 'value' in prop) {
					(prop as { value: unknown }).value = data[key];
				} else {
					(this as Record<string, unknown>)[key] = data[key]; // fallback for non-ref fields
				}
			}
		}
	}

	reset = () => {
		// console.log('Loading data:', data);
		console.log('Before load - coins:', this.coins.value);
		console.log(this.dimensions[0]);

		// Create a new default game instance
		const fresh = new Game();

		// Stop saving temporarily to avoid overwriting
		clearInterval(this.autoSaveInterval);
		clearInterval(this.updateInterval);

		// // Copy state values from fresh instance
		// for (const key in fresh) {
		// 	const tkey = key as keyof Game;

		// 	const freshValue = fresh[tkey];

		// 	if (freshValue && typeof freshValue === 'object' && 'value' in freshValue) {
		// 		(this[tkey] as { value: unknown }).value = freshValue.value;
		// 	} else {
		// 		(this as Record<string, unknown>)[tkey] = freshValue;
		// 	}
		// }
		this.load(fresh.getSave());

		this.coins.value = Config.startCoins;

		this.tickspeed.value = 0;
		this.dimensions.fill(0);
		this.dimBought.fill(0);

		// Reset timestamps and restart intervals
		this.time = Date.now();
		this.autoSaveInterval = setInterval(() => this.save(), 33);
		this.updateInterval = setInterval(() => this.doUpdate(), 33);

		this.save();

		console.log('After load - coins:', this.coins.value);
		console.log(this.dimensions[0]);
	}
}
