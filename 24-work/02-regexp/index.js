let regexp1 = /love/; // Проверить что слово love встречается в строке
let regexp2 = /ing$/; // Проверить что строка заканчивается на ing

alert( regexp1.test('I love JavaScript') ); // true
alert( regexp1.test('I JavaScript') ); // false

alert( regexp2.test('Good morning') ); // true
alert( regexp2.test('Good morning!') ); // false