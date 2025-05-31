import { Game } from "./game";

export default new Game();

// Return the reactive data and methods to be used in the template.
// Vue automatically unwraps `ref` values in the template, so `coins` and `coinsPerClick`
// can be used directly without `.value`.