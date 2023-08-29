const readline = require('readline');
const calculator = require('./calculator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptInput() {
    rl.question('Введите операцию (add/sub/mult/div) и два числа через пробел: ', (input) => {
        const [operation, num1, num2] = input.split(' ');

        switch (operation) {
            case 'add':
                console.log(`Результат: ${calculator.add(Number(num1), Number(num2))}`);
                break;
            case 'sub':
                console.log(`Результат: ${calculator.sub(Number(num1), Number(num2))}`);
                break;
            case 'mult':
                console.log(`Результат: ${calculator.mult(Number(num1), Number(num2))}`);
                break;
            case 'div':
                console.log(`Результат: ${calculator.div(Number(num1), Number(num2))}`);
                break;
            default:
                console.log('Неверная операция.');
        }

        promptInput();
    });
}

promptInput();