const historyDialog = document.getElementById("historyDialog");
const showHistoryBtn = document.getElementById("historyBtn");
const closeHistoryBtn = document.getElementById("closeHistory");
const submitBtn = document.getElementById("submitBtn");
const guessInput = document.getElementById("guessInput");
const resultDisplay = document.getElementById("result");
const historyList = document.getElementById("historyList");

showHistoryBtn.addEventListener("click", () => {
  historyDialog.showModal();
});

closeHistoryBtn.addEventListener("click", () => {
  historyDialog.close();
});

submitBtn.addEventListener("click", () => {
    guessNumber();
});

historyDialog.addEventListener("click", (event) => {
  if (event.clientX < historyDialog.getBoundingClientRect().left ||
      event.clientX > historyDialog.getBoundingClientRect().right ||
      event.clientY < historyDialog.getBoundingClientRect().top ||
      event.clientY > historyDialog.getBoundingClientRect().bottom) {
    historyDialog.close();
  }
});

let randomNumber = 0;
let attempts = 0;
let guessHistory = [];
let currentMin = 1;
let currentMax = 100;

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    currentMax = 100;
    currentMin = 1;
}

function updateHistory() {
    historyList.innerHTML = "";
    guessHistory.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

function guessNumber() {
    const userGuess = parseInt(guessInput.value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    }

    if (userGuess <= currentMin || userGuess >= currentMax) {
        alert(`Please guess a number between ${currentMin} and ${currentMax}.`);
        return;
    }

    attempts += 1;

    if (userGuess < randomNumber) {
        currentMin = Math.max(currentMin, userGuess);
        resultDisplay.textContent = `Too low! Try again: ${currentMin} to ${currentMax}`;
    } else if (userGuess > randomNumber) {
        currentMax = Math.min(currentMax, userGuess);
        resultDisplay.textContent = `Too high! Try again: ${currentMin} to ${currentMax}`;
    } else {
        resultDisplay.textContent = `Congratulations! You've guessed the number ${randomNumber} in ${attempts} attempts.`;
        guessHistory.push(`Guessed ${userGuess} in ${attempts} attempts.`);
        updateHistory();
        initializeGame();
    }
}


initializeGame();