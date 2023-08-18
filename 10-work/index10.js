// нужен класс Гамбургер
class Hamburger {
    constructor(size) {
        this.size = size;
        this.toppings = [];
    }

    // статические константы.
    static SIZE_SMALL = {
        price: 50,
        calories: 20
    };

    static SIZE_MEDIUM = {
        price: 75,
        calories: 30
    };

    static SIZE_LARGE = {
        price: 100,
        calories: 40
    };

    static TOPPING_CHEESE = {
        price: 10,
        calories: 20
    };

    static TOPPING_SALAD = {
        price: 20,
        calories: 5
    };

    static TOPPING_POTATO = {
        price: 15,
        calories: 10
    };

    static TOPPING_SPICE = {
        price: 15,
        calories: 0
    };

    static TOPPING_MAYO = {
        price: 20,
        calories: 5
    };
}

// Все методы нужно положить в прототип.
Hamburger.prototype.addTopping = function(topping) {
    this.toppings.push(topping);
};

Hamburger.prototype.getPrice = function() {
    let totalPrice = this.size.price;
    for (let i = 0; i < this.toppings.length; i++) {
        totalPrice += this.toppings[i].price;
    }
    return totalPrice;
};

Hamburger.prototype.getCalories = function() {
    let totalCalories = this.size.calories;
    for (let i = 0; i < this.toppings.length; i++) {
        totalCalories += this.toppings[i].calories;
    }
    return totalCalories;
};

const hamburger = new Hamburger(Hamburger.SIZE_SMALL);

hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_POTATO);
hamburger.addTopping(Hamburger.TOPPING_POTATO);

console.log('Price with toppings: ' + hamburger.getPrice());
console.log('Calories with toppings: ' + hamburger.getCalories());
