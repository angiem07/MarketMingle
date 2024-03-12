import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = ({ standalone = false }) => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((stripe) => {
        stripe.redirectToCheckout({ sessionId: data.checkout.session }).catch((err) => {
          console.error("Stripe checkout error:", err);
        });
      });
    } else if (loading) {
      console.log('Retrieving checkout session...');
    } else if (error) {
      console.error("Checkout error:", error);
    }
  }, [data, loading, error]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    return state.cart.reduce((sum, item) => sum + item.price * item.purchaseQuantity, 0).toFixed(2);
  }

  function submitCheckout() {
    const productIds = state.cart.map(item => item._id);
    getCheckout({
      variables: { products: productIds },
    }).catch((err) => {
      console.error("Error initiating checkout:", err);
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        🛒
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>[close]</div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">😱</span> You haven't added anything to your cart yet!
        </h3>
      )}
      <Link to="/cart" className="button-to-full-cart">View Full Cart</Link>
    </div>
  );
};

export default Cart;
