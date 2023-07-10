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
    return this.value;
};

Calculator.prototype.sub = function (num) {
    if (this.validateNumber(num)) {
        this.value -= num;
    }
    return this.value;
};

Calculator.prototype.set = function (num) {
    if (this.validateNumber(num)) {
        this.value = num;
    }
    return this.value;
};

Calculator.prototype.get = function () {
    return this.value;
};

Calculator.prototype.reset = function () {
    this.value = this.base;
};

const calc = new Calculator(100);

console.log(calc.add(10)); // 110
console.log(calc.add(10)); // 120
console.log(calc.sub(20)); // 100
console.log(calc.set(20)); // 20
console.log(calc.add(10)); // 30
console.log(calc.add(10)); // 40
console.log(calc.add('qwe')); // 40
console.log(calc.get()); // 40

calc.reset();
console.log(calc.get()); // 100
