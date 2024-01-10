// VARIABLES //
let firstNumber;
let secondNumber;
let operator;
let display = "";

// DOM SELECTORS //
const allClearButtonDOM = document.querySelector("#all-clear");
const displayDOM = document.querySelector("#display");
const digitsDOM = document.querySelectorAll(".digit");
const clearButtonDOM = document.querySelector("#clear");
const equalsButtonDOM = document.querySelector("#equals");
const minusButtonDOM = document.querySelector("#minus");
const multiplicationButtonDOM = document.querySelector("#multiplication");
const negativeSignDisplayDOM = document.querySelector("#negative-sign");
const plusButtonDOM = document.querySelector("#plus");
const plusMinusButtonDOM = document.querySelector("#plus-minus");

// FUNCTIONS //
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

// EVENT LISTENERS //
// Adds event listener which clears the display when the AC button is pressed
allClearButtonDOM.addEventListener("click", (e) => {
    firstNumber = undefined;
    secondNumber = undefined;
    operator = undefined;
    resetDisplay();
});

// Adds event listener which clears the display when the C button is pressed
clearButtonDOM.addEventListener("click", (e) => {
    resetDisplay();
});

// Adds a click event listener to all digits which updates the display
digitsDOM.forEach(digit => {
    digit.addEventListener("click", (e) => {
        targetText = e.target.textContent;
        
        // This conditional is to add a leading zero before the period
        // if the display is at a zero state
        if (displayIsAtZeroState() && targetText == ".") 
            targetText = "0.";

        sendToDisplay(targetText);
    })
});

equalsButtonDOM.addEventListener("click", (e) => {
    secondNumber = Number(displayDOM.textContent);
    display = "";
    sendToDisplay(operate(operator, firstNumber, secondNumber));
});

minusButtonDOM.addEventListener("click", (e) => {
    firstNumber = Number(displayDOM.textContent);
    operator = subtract;
    display = "";
});

multiplicationButtonDOM.addEventListener("click", (e) => {
    firstNumber = Number(displayDOM.textContent);
    operator = multiply;
    display = "";
});

plusButtonDOM.addEventListener("click", (e) => {
    firstNumber = Number(displayDOM.textContent);
    operator = add;
    display = "";
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
    if (display.includes(".") && textToDisplay == ".")
        return;

    // If the display is at zero state then the textToDisplay replaces the zero,
    // otherwise, the textToDisplay is concatenated to what is in display.
    if (displayIsAtZeroState())
        display = String(textToDisplay)
    else 
        display += String(textToDisplay);
    display = display.substring(0,8);
    displayDOM.textContent = display;
}

// HELPER FUNCTIONS
function displayIsAtZeroState() {
    let currentDisplay = displayDOM.textContent;
    return currentDisplay == 0 && !currentDisplay.includes(".");
}

function resetDisplay() {
    display = "0";
    displayDOM.textContent = display;
}