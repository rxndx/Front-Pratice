//Реалізувати рекурсивну функцію, яка зводить число в ступінь.
//
// Число, яке треба піднести до ступеню, передається як перший аргумент у функції;
// Ступінь передається як другий аргумент у функцію pow (num, degree).

console.log(pow(2, 3));
console.log(pow(5, 2));
console.log(pow(10, 0));

function pow(num, degree) {
    if (degree === 0) {
        return 1;
    }
    return num * pow(num, degree - 1);
}