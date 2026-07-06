import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from '../context/StateProvider';

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
  // 1. Bring in the dispatch function to talk to our global state
  const [{ basket }, dispatch] = useStateValue();

  // 2. Create the function that fires when the button is clicked
  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id, // We must pass the exact ID so the reducer knows which one to drop!
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt={title} />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        
        {/* 3. Attach the onClick listener to the button */}
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Cart</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;