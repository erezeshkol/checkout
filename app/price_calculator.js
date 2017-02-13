/**
 * Calculates the price of the items in the given cart.
 * @param items A list of all available items and discounts.
 *              The format for the list is: [{id: 'item1', price: 40, discount: {amount: 3, price: 100}}].
 *              The discount key defines a special discount for an item and is optional. Each discount will only be
 *                applied once.
 * @param cart The user's cart. This is an associative array in with the format {itemId: amount}. Each itemId must be
 *              in the items array, or the function throws.
 *
 * @throws Error if the cart contains an illegal item (an item not included in the items array).
 */
export default function CalculatePrice(items, cart) {
  let price = 0, discount = 0;

  for (let item in cart) {
    let theItem = items.find(i => i.id == item);
    if (!theItem) {
      throw new Error(`Item ${item} was in cart but not in item list`);
    }

    let itemCount = cart[item];
    price += theItem.price * itemCount;

    let itemDiscount = theItem.discount;
    if (itemDiscount && itemCount >= itemDiscount.amount) {
      let normalPrice = theItem.price * itemDiscount.amount;
      discount += (normalPrice - itemDiscount.price);
    }
  }

  return {price, discount};
}