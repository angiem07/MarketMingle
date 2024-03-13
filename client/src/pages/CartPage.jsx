import React from 'react';
import Cart from '../components/Cart';
import { Link } from 'react-router-dom';

function CartPage() {
  return (
    <div className="container">
      <h1>Your Shopping Cart</h1>
      <Cart standalone={true} />
      <Link to="/home">Continue Shopping</Link>
    </div>
  );
}

export default CartPage;
