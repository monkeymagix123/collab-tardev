let coins = 0;
const coinDisplay = document.getElementById("coin-count") as HTMLSpanElement;
const clickButton = document.getElementById("click-button") as HTMLButtonElement;

clickButton.addEventListener("click", () => {
  coins++;
  updateDisplay();
});

setInterval(() => {
  coins += 1;
  updateDisplay();
}, 1000);

function updateDisplay(): void {
  coinDisplay.textContent = coins.toString();
}