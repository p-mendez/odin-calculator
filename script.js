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
/* Returns sum of any number of arguments passed */
function add(...numbers) {
    return numbers.reduce((previous, current) => previous + current, 0);
}

/* Returns the quotient of the dividend and divisor) */
function divide(dividend, divisor) {
    return dividend / divisor;
}

/* Returns the quotient of any number of arguments passed */
function multiply(...numbers) {
    return numbers.reduce((previous, current) => previous * current, 1);
}

/* Delegates the operation based on the operator and the two numbers passed */
function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}

/* Returns the difference of the minuend minus the subtrahend */
function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
}

// EVENT LISTENERS //
// DIGITS
// Adds a click event listener to all digits which updates the display
digitsDOM.forEach(digit => {
    digit.addEventListener("click", (e) => {
        // Removes the negative sign in the display if this is the first digit of a number
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

// EVENT LISTENERS //
// OPERATIONS
/* This function displays current result and saves it to firstNumber if 
 * there is already an operator assigned; otherwise, it saves the displayed
 * number as firstNumber. After, it assigns the operator to divide */
divisionButtonDOM.addEventListener("click", (e) => {
    setFirstNumberOrDisplayCurrentResult();
    operator = divide;
    numberToDisplay = "";
});

/* This function saves the displayed number as secondNumber. Then it checks
 * to see if there is a division by zero, otherwise it evaluates the current
 * operation and sends it to display */
equalsButtonDOM.addEventListener("click", (e) => {
    secondNumber = getNumber();
    numberToDisplay = "";
    if (operator == divide && secondNumber == 0)
        sendToDisplay("NNN0P3!");
    else
        sendToDisplay(operate(operator, firstNumber, secondNumber));
});

/* This function displays current result and saves it to firstNumber if 
 * there is already an operator assigned; otherwise, it saves the displayed
 * number as firstNumber. After, it assigns the operator to subtract */
minusButtonDOM.addEventListener("click", (e) => {
    setFirstNumberOrDisplayCurrentResult();
    operator = subtract;
    numberToDisplay = "";
});

/* This function displays current result and saves it to firstNumber if 
 * there is already an operator assigned; otherwise, it saves the displayed
 * number as firstNumber. After, it assigns the operator to multiply */
multiplicationButtonDOM.addEventListener("click", (e) => {
    setFirstNumberOrDisplayCurrentResult();
    operator = multiply;
    numberToDisplay = "";
});

/* This function displays current result and saves it to firstNumber if 
 * there is already an operator assigned; otherwise, it saves the displayed
 * number as firstNumber. After, it assigns the operator to add */
plusButtonDOM.addEventListener("click", (e) => {
    setFirstNumberOrDisplayCurrentResult();
    operator = add;
    numberToDisplay = "";
});

// EVENT LISTENERS //
// OTHER BUTTONS
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

// HELPER FUNCTIONS
/* Displays current (running) result. This is used in lieu of using the equal sign */
function displayCurrentResult() {
    secondNumber = getNumber();
    numberToDisplay = "";
    firstNumber = operate(operator, firstNumber, secondNumber);
    sendToDisplay(firstNumber);
}

/* Returns true if current display shows a 0 without a period; otherwise, false */
function displayIsAtZeroState() {
    let currentDisplay = displayDOM.textContent;
    return currentDisplay == 0 && !currentDisplay.includes(".");
}

/* This function returns an 8 digit truncated number of what should be displayed on screen */
function getDisplayString(text) {
    if (displayIsAtZeroState())
        numberToDisplay = String(text);
    else 
        numberToDisplay += String(text);

    return numberToDisplay.substring(0,8);
}

/* Displays the current running total if there is an operator saved. Otherwise, it gets
 * what is displayed and saves it as firstNumber.*/
function setFirstNumberOrDisplayCurrentResult() {
    if (operator) {
        displayCurrentResult();
    } else {
        firstNumber = getNumber();
    }
}

/* Retuns actual number that is displayed in the screen. If the negative sign is activated, 
 * on the display, then the number returned will be a negative number; otherwise, it will be 
 * a positive number */
function getNumber() {
    if (negativeSignDisplayDOM.textContent == "−") {
        return -1 * Number(displayDOM.textContent);
    } else {
        return Number(displayDOM.textContent);
    }
}

/* Reset display to show 0 and turns off the negative sign */
function resetDisplay() {
    numberToDisplay = "0";
    displayDOM.textContent = numberToDisplay;
    negativeSignDisplayDOM.textContent = "";
}

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