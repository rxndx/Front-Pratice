//Створити скрипт який повинен виконувати наступне:
//
// питаємо у користувача, що він хоче зробити (add, sub, mult, div);
// питаємо у користувача перше число;
// запитуємо у користувача друге число;
// виводимо результат дії (add, sub, mult, div) з усіма операндами (Наприклад "2 + 3 = 5").

const operation = prompt("Що ви хочете зробити? (add, sub, mult, div)");
const numberA = parseFloat(prompt("Введіть перше число:"));
const numberB = parseFloat(prompt("Введіть друге число:"));
let result;

switch (operation) {
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
    default:
        console.log("Невідома операція");
        break;
}

alert(`${numberA} ${operation} ${numberB} = ${result}`);
