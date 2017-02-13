/**
 * This is a demo to show the price being calculated live. Since it's not a requirement, I didn't spend much time on
 * making it (or the code) look nice.
 * In a real project, I'd separate the classes here to different files, and of course the ui would look better.
 */

import React from 'react';
import CalculatePrice from './price_calculator';

const demoItems = [
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
      Subtotal: {price} <br />
      Discount: {discount} <br />
      Final Price: {price - discount}
    </div>;
  }
}

export default class CheckoutApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: [], cart: {}};
  }

  componentWillMount() {
    this.getAvailableItems();
  }

  getAvailableItems() {
    // This is where we'd normally get the items from the back end. For this demo, it just comes from a static array.
    this.setState({items: demoItems});
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
    return <div className="CheckoutApp">
      <ItemCatalogue items={this.state.items} onAddItem={this.onAddItem.bind(this)}
                     onRemoveItem={this.onRemoveItem.bind(this)}/>
      <br />
      <ShoppingCart {...this.state} />
    </div>
  }
}
