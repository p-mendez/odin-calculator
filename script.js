// VARIABLES //
let numberToDisplay = "";
let firstNumber;
let operator;
let secondNumber;

// DOM SELECTORS //
const allClearButtonDOM = document.querySelector("#all-clear");
const clearButtonDOM = document.querySelector("#clear");
const displayDOM = document.querySelector("#display");
const digitsDOM = document.querySelectorAll(".digit");
const divisionButtonDOM = document.querySelector("#division");
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
        if (!numberToDisplay) 
            negativeSignDisplayDOM.textContent = "";

        targetText = e.target.textContent;
        
        // This conditional is to add a leading zero before the period
        // if the display is at a zero state
        if (displayIsAtZeroState() && targetText == ".") 
            targetText = "0.";

        sendToDisplay(targetText);
    })
});

divisionButtonDOM.addEventListener("click", (e) => {
    firstNumber = getNumber();
    operator = divide;
    numberToDisplay = "";
});

equalsButtonDOM.addEventListener("click", (e) => {
    secondNumber = getNumber();
    numberToDisplay = "";
    if (operator == divide && secondNumber == 0)
        sendToDisplay("NNN0P3!");
    else
        sendToDisplay(operate(operator, firstNumber, secondNumber));
});

minusButtonDOM.addEventListener("click", (e) => {
    firstNumber = getNumber();
    operator = subtract;
    numberToDisplay = "";
});

multiplicationButtonDOM.addEventListener("click", (e) => {
    firstNumber = getNumber();
    operator = multiply;
    numberToDisplay = "";
});

plusButtonDOM.addEventListener("click", (e) => {
    if (operator) {
        displayCurrentResult();
    } else {
        firstNumber = getNumber();
    }
    operator = add;
    numberToDisplay = "";
});

// Adds event listener which shows a negative sign when +/- button is pressed
plusMinusButtonDOM.addEventListener("click", (e) => {
    if (displayIsAtZeroState())
        return;
    let isNegative = negativeSignDisplayDOM.textContent.includes("−");

    if (isNegative) {
        negativeSignDisplayDOM.textContent = "";
    } else {
        negativeSignDisplayDOM.textContent = "−"
    }
});

// sends textToDisplay to the display node in the DOM
function sendToDisplay(textToDisplay) {
    negativeSignDisplayDOM.textContent = "";

    // guard against double decimals
    if (numberToDisplay.includes(".") && textToDisplay == ".")
        return;

    numberToDisplay = getDisplayString(textToDisplay);

    if (numberToDisplay < 0) {
        negativeSignDisplayDOM.textContent = "−";
        numberToDisplay = Math.abs(numberToDisplay);
    }
    displayDOM.textContent = numberToDisplay;
}

// HELPER FUNCTIONS
function displayCurrentResult() {
    secondNumber = getNumber();
    numberToDisplay = "";
    firstNumber = operate(operator, firstNumber, secondNumber);
    sendToDisplay(firstNumber);
}

function displayIsAtZeroState() {
    let currentDisplay = displayDOM.textContent;
    return currentDisplay == 0 && !currentDisplay.includes(".");
}

function getDisplayString(text) {
    if (displayIsAtZeroState())
        numberToDisplay = String(text);
    else 
        numberToDisplay += String(text);

    return numberToDisplay.substring(0,8);
}

function getNumber() {
    if (negativeSignDisplayDOM.textContent == "−") {
        return -1 * Number(displayDOM.textContent);
    } else {
        return Number(displayDOM.textContent);
    }
}

function resetDisplay() {
    numberToDisplay = "0";
    displayDOM.textContent = numberToDisplay;
    negativeSignDisplayDOM.textContent = "";
}