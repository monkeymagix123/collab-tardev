import { Game } from "./game";

let game = new Game();

let coins = game.coins;
let coinsPerClick = game.coinsPerClick;
let clickForCoins = game.clickForCoins;

// Return the reactive data and methods to be used in the template.
// Vue automatically unwraps `ref` values in the template, so `coins` and `coinsPerClick`
// can be used directly without `.value`.
export default {
    coins,
    coinsPerClick,
    clickForCoins
};