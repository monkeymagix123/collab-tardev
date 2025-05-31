import { createApp, ref, computed } from 'vue';

/**
 * Defines the reactive state for our simple idle game.
 * `ref` is used to create a reactive reference to a primitive value (like a number).
 * When `coins.value` changes, Vue automatically knows to re-render parts of the UI that depend on it.
 */
const coins = ref(0);

/**
 * A computed property that calculates coins gained per click.
 * `computed` properties are reactive and automatically re-evaluate when their dependencies change.
 * In this simple example, it's a constant, but it demonstrates the concept.
 */
const coinsPerClick = computed(() => 1);

/**
 * Function to handle the button click event.
 * Increments the `coins` reactive variable by the `coinsPerClick` amount.
 */
const clickForCoins = () => {
  coins.value += coinsPerClick.value;
};

/**
 * Creates the main Vue application instance.
 * The `template` option defines the HTML structure for the root component.
 * The `setup()` function is where we define reactive state, computed properties,
 * and methods that will be exposed to the template.
 */
const app = createApp({
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4">
      <div class="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-30 w-full max-w-md text-center">
        <h1 class="text-5xl font-bold mb-6 text-shadow-lg">Vue Idle Clicker</h1>
        <p class="text-3xl mb-8">Coins: <span class="font-extrabold text-yellow-300">{{ coins }}</span></p>
        <button
          @click="clickForCoins"
          class="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-200 ease-in-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-75 text-2xl"
        >
          Click for {{ coinsPerClick }} Coin{{ coinsPerClick.value === 1 ? '' : 's' }}
        </button>
      </div>
    </div>
  `,
  setup() {
    // Return the reactive data and methods to be used in the template.
    // Vue automatically unwraps `ref` values in the template, so `coins` and `coinsPerClick`
    // can be used directly without `.value`.
    return {
      coins,
      coinsPerClick,
      clickForCoins
    };
  }
});

// Mount the Vue application to the DOM element with the ID "app".
app.mount('#app');