// VARIABLES
let firstNumber;
let secondNumber;
let operator;
let display = "";

// DOM SELECTORS
const allClearButtonDOM = document.querySelector("#all-clear");
const displayDOM = document.querySelector("#display");
const digitsDOM = document.querySelectorAll(".digit");
const clearButtonDOM = document.querySelector("#clear");
const plusButtonDOM = document.querySelector("#plus");
const plusMinusButtonDOM = document.querySelector("#plus-minus");
const negativeSignDisplayDOM = document.querySelector("#negative-sign");

// FUNCTIONS 
function add(...numbers) {
    return numbers.reduce((previous, current) => previous + current, 0);
}

function divide(dividend, divisor) {
    return dividend / divisor;
}

function multiply(...numbers) {
    return numbers.reduce((previous, current) => previous * current, 1);
}

/* Delegates the operation based on the operator and the two numbers passed */
function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}

function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
}

// Event Listeners
// Adds event listener which clears the display when the AC button is pressed
allClearButtonDOM.addEventListener("click", (e) => {
    display = "";
    displayDOM.textContent = display;
});

// Adds a click event listener to all digits which updates the display
digitsDOM.forEach(digit => {
    digit.addEventListener("click", (e) => {
        targetText = e.target.textContent;
        sendToDisplay(targetText);
    })
});

// Adds event listener which clears the display when the C button is pressed
clearButtonDOM.addEventListener("click", (e) => {
    display = "";
    displayDOM.textContent = display;
});

plusButtonDOM.addEventListener("click", (e) => {
    firstNumber = Number(displayDOM.textContent);
    operator = add;
});

// Adds event listener which shows a negative sign when +/- button is pressed
plusMinusButtonDOM.addEventListener("click", (e) => {
    let isNegative = negativeSignDisplayDOM.textContent.includes("−");

    if (isNegative) {
        negativeSignDisplayDOM.textContent = "";
    } else {
        negativeSignDisplayDOM.textContent = "−";
    }
});

// sends textToDisplay to the display node in the DOM
function sendToDisplay(textToDisplay) {
    // guard against double decimals
    if (displayHasOneDecimal(textToDisplay))
        return;

    if (displayIsAtZeroState())
        display = String(textToDisplay)
    else 
        display += String(textToDisplay);
    display = display.substring(0,8);
    displayDOM.textContent = display;
}

// HELPER FUNCTIONS
function displayHasOneDecimal(textToDisplay) {
    return display.includes(".") && textToDisplay == ".";
}
function displayIsAtZeroState() {
    let currentDisplay = displayDOM.textContent;
    return currentDisplay == 0 && !currentDisplay.includes(".");
}