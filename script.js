// VARIABLES
let firstNumber;
let secondNumber;
let operator;
let display = "";

// DOM VARIABLES
let displayDOM = document.querySelector("#display");
let digitsDOM = document.querySelectorAll(".digit");

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

function sendToDisplay(event) {
    display += "" + event.target.textContent;
    display = display.substring(0,8);
    displayDOM.textContent = display;
}