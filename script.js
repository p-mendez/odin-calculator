// VARIABLES
let firstNumber;
let secondNumber;
let operator;

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