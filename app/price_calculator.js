/**
 * Calculates the price of the items in the given cart.
 * @param items A list of all available items and discounts.
 * @param cart The user's cart.
 */
export default function CalculatePrice(items, cart) {
  let price = 0, discount = 0;
  for (let item in cart) {
    let itemCount = cart[item];
    let theItem = items.find(i => i.id == item);
    if (theItem) {
      price += theItem.price * itemCount;

      let itemDiscount = theItem.discount;
      if (itemDiscount && itemCount >= itemDiscount.amount) {
        let normalPrice = theItem.price * itemDiscount.amount;
        discount += (normalPrice - itemDiscount.price);
      }
    }
  }

  return {price, discount};
}