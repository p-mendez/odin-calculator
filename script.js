function add(...numbers) {
    return numbers.reduce((previous, current) => previous + current, 0);
}