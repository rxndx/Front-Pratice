function createCalculator(base) {
    let value = base;

    const add = (num) => typeof num === 'number' && (value += num);
    const sub = (num) => typeof num === 'number' && (value -= num);
    const set = (num) => typeof num === 'number' && (value = num);
    const get = () => value;
    const reset = () => (value = base);

    return { add, sub, set, get, reset };
}

const calculator = createCalculator(100);

calculator.add(10);
calculator.add(10);
calculator.sub(20);
calculator.set(20);
calculator.add(10);
calculator.add(10);
calculator.add('qwe');
console.log(calculator.get()); // 40

calculator.reset();
console.log(calculator.get()); // 100