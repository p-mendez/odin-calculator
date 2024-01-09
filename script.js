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
const plusMinusButtonDOM = document.querySelector("#plus-minus");

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
digitsDOM.forEach(digit => {
    digit.addEventListener("click", sendToDisplay);
});

allClearButtonDOM.addEventListener("click", (e) => {
    display = "";
    displayDOM.textContent = display;
});

clearButtonDOM.addEventListener("click", (e) => {
    display = "";
    displayDOM.textContent = display;
});

function sendToDisplay(event) {
    targetText = event.target.textContent;

    // guard against double decimals
    if (display.includes(".") && targetText == ".")
        return;

    display += "" + event.target.textContent;
    display = display.substring(0,8);
    displayDOM.textContent = display;
}