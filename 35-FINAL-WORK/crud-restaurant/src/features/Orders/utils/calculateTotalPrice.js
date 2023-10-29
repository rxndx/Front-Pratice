export function calculateTotalPrice(order, dishes) {
    return Array.isArray(order.dishes) ? order.dishes.reduce((total, orderDish) => {
        const dish = dishes.find(d => d.id === orderDish.dishId);
        return total + (dish ? dish.price * orderDish.count : 0);
    }, 0) : 0;
}