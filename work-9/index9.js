function Calculator(base) {
    this.base = base;
    this.value = base;
}

Calculator.prototype.validateNumber = function (num) {
    return typeof num === 'number' && !isNaN(num);
};

Calculator.prototype.add = function (num) {
    if (this.validateNumber(num)) {
        this.value += num;
    }
};

Calculator.prototype.sub = function (num) {
    if (this.validateNumber(num)) {
        this.value -= num;
    }
};

Calculator.prototype.set = function (num) {
    if (this.validateNumber(num)) {
        this.value = num;
    }
};

Calculator.prototype.get = function () {
    return this.value;
};

Calculator.prototype.reset = function () {
    this.value = this.base;
};

const calc = new Calculator(100);

calc.add(10); // 110
calc.add(10); // 120
calc.sub(20); // 100
calc.set(20); // 20
calc.add(10); // 30
calc.add(10); // 40
calc.add('qwe'); // 40
console.log(calc.get()); // 40

calc.reset();
console.log(calc.get()); // 100
