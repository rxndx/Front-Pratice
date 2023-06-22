printNumbers();
printSquares();
multiplicationTable();
calculateSum();
calculateProduct();
calculateAverage();

// Вивести на сторінку в один рядок через кому числа від 10 до 20
function printNumbers() {
    let numbers = [];
    for (let i = 10; i <= 20; i++) {
        numbers.push(i);
    }
    console.log(numbers.join(", "));
}

// Вивести квадрати чисел від 10 до 20
function printSquares() {
    for (let i = 10; i <= 20; i++) {
        console.log(i * i);
    }
}

// Вивести таблицю множення на 7
function multiplicationTable() {
    for (let i = 1; i <= 10; i++) {
        console.log(`7 * ${i} = ${7 * i}`);
    }
}

// Знайти суму всіх цілих чисел від 1 до 15
function calculateSum() {
    let sum = 0;
    for (let i = 1; i <= 15; i++) {
        sum += i;
    }
    console.log(`Сума: ${sum}`);
}

// Знайти добуток усіх цілих чисел від 15 до 35
function calculateProduct() {
    let product = 1;
    for (let i = 15; i <= 35; i++) {
        product *= i;
    }
    console.log(`Добуток: ${product}`);
}

// Знайти середнє арифметичне всіх цілих чисел від 1 до 500
function calculateAverage() {
    let sum = 0;
    let count = 0;
    for (let i = 1; i <= 500; i++) {
        sum += i;
        count++;
    }
    const average = sum / count;
    console.log(`Середнє арифметичне: ${average}`);
}

