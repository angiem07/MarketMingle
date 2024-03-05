import React from 'react';
import PropTypes from 'prop-types';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise('cart', 'delete', item);
  };

  const onChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: value,
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: value });
    } else {
      removeFromCart();
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt={`${item.name}`}
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            min="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <button
            onClick={removeFromCart}
            aria-label={`Remove ${item.name} from cart`}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    purchaseQuantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default React.memo(CartItem);
