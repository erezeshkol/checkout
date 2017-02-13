import React from 'react';
import CalculatePrice from './price_calculator';

const items = [
  {
    id: 'A',
    price: 50,
    discount: {
      amount: 3,
      price: 120
    }
  },
  {
    id: 'B',
    price: 30,
    discount: {
      amount: 2,
      price: 45
    }
  },
  {
    id: 'C',
    price: 60
  },
  {
    id: 'D',
    price: 15
  }
];

function Item({id, price, onAddItem, onRemoveItem}) {
  return <div>{id} {price}
    <button onClick={() => onAddItem(id)}>+</button>
    <button onClick={() => onRemoveItem(id)}>-</button>
  </div>;
}

function ItemCatalogue({items, onAddItem, onRemoveItem}) {
  return <div className="AvailableItems">
    {
      items.map(item => <Item key={item.id} {...item} onAddItem={onAddItem} onRemoveItem={onRemoveItem}/>)
    }
  </div>;
}

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      cart: props.cart
    };
  }

  render() {
    let {price, discount} = CalculatePrice(this.state.items, this.state.cart);
    return <div className="ShoppingCart">
      Price: {price} <br />
      Discount: {discount} <br />
      Subtotal: {price - discount}
    </div>;
  }
}

export default class CheckoutApp extends React.Component {
  constructor(props) {
    super(props);
    // We're getting this from a const defined here. Would normally come from the backend.
    this.state = {items, cart: {}};
  }

  onAddItem(id) {
    let currentCart = this.state.cart;
    let currentAmount = currentCart[id] || 0;
    currentCart[id] = currentAmount + 1;
    this.setState({cart: currentCart});
  }

  onRemoveItem(id) {
    if ((id in this.state.cart == false) || (this.state.cart[id] == 0)) {
      return;
    }

    let currentCart = this.state.cart;
    currentCart[id]--;
    this.setState({cart: currentCart})
  }

  render() {
    return <div className="SupermarktApp">
      <ItemCatalogue items={this.state.items} onAddItem={this.onAddItem.bind(this)}
                     onRemoveItem={this.onRemoveItem.bind(this)}/>
      <br />
      <ShoppingCart {...this.state} />
    </div>
  }
}
