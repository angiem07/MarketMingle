import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { Link } from 'react-router-dom';
import './style.css';

const stripePromise = loadStripe('pk_test_51OswYK07VB9gYcRnoHfKQhgqyQLPBRYAMFjhMfFMbfuEU9h2PVA9t8wl0fqc0EnLwTgRyKZtUWrCvd6cRNY2xqpB00B5n7dKRt');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [checkout, { data, error, loading }] = useMutation(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      }).catch((error) => {
        console.error("Error redirecting to checkout:", error);
      });
    } else if (error) {
      console.error("Error fetching checkout session:", error);
      alert("An error occurred while fetching the checkout session.");
    }
  }, [data, error]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: cart });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    if (!Auth.loggedIn()) {
        alert("Please log in to checkout.");
        return;
    }

    // Ensure product IDs are valid and quantities are not NaN
    const productIds = state.cart.map(item => item._id);
    const sanitizedProductIds = productIds.filter(id => !isNaN(id));

    if(sanitizedProductIds.length === 0) {
        console.error("No valid product IDs for checkout.");
        return; // Prevent checkout if no valid IDs
    }

    checkout({
        variables: { products: sanitizedProductIds },
    }).catch(error => {
        console.error("Checkout error:", error);
        alert("An error occurred during checkout.");
    });
}


  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">🛒</span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>[x]</div>

      {loading && <p>Loading checkout...</p>}
      {error && <p>Error during checkout: {error.message}</p>}
      
      <h2>Your Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            <button onClick={submitCheckout}>Checkout</button>
          </div>
        </div>
      ) : (
        <h3><span role="img" aria-label="shocked">😱</span> You haven't added anything to your cart yet!</h3>
      )}

      {/* Optionally include the View Full Cart button if needed */}
      {state.cartOpen && (
        <Link to="/cart" className="button-to-full-cart">View Full Cart</Link>
      )}
    </div>
  );
};

export default Cart;
