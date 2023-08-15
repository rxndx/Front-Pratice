const operator = getOperator();
const numberA = getOperand("Введіть перше число:");
const numberB = getOperand("Введіть друге число:");

const result = performOperation(operator, numberA, numberB);
showResult(numberA, operator, numberB, result);

function getOperator() {
    const allowedOperators = ["add", "sub", "mult", "div"];
    let operator = prompt("Що ви хочете зробити? (add, sub, mult, div)");

    while (!allowedOperators.includes(operator)) {
        operator = prompt(`Невірний оператор. Введіть коректний оператор: ${allowedOperators}`);
    }

    return operator;
}

function getOperand(promptMessage) {
    let operand = parseFloat(prompt(promptMessage));

    while (isNaN(operand)) {
        operand = parseFloat(prompt("Введено невірне число."));
    }

    return operand;
}

function performOperation(operator, numberA, numberB) {
    let result;

    switch (operator) {
        case "add":
            result = numberA + numberB;
            break;
        case "sub":
            result = numberA - numberB;
            break;
        case "mult":
            result = numberA * numberB;
            break;
        case "div":
            result = numberA / numberB;
            break;
    }

    return result;
}

function showResult(numberA, operator, numberB, result) {
    alert(`${numberA} ${operator} ${numberB} = ${result}`);
}