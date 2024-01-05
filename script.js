function add(...numbers) {
    return numbers.reduce((previous, current) => previous + current, 0);
}

function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
}

function multiply(...numbers) {
    return numbers.reduce((previous, current) => previous * current, 1);
}