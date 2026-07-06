import React from 'react';
import './Checkout.css';
import Subtotal from '../components/Subtotal';
import { useStateValue } from '../context/StateProvider';
import CheckoutProduct from '../components/CheckoutProduct';

function Checkout() {
  // Pull the basket and user from the global state
  const [{ basket, user }] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="Amazon Ad"
        />

        <div>
          <h3>Hello, {user?.email || 'Guest'}</h3>
          <h2 className="checkout__title">Your Shopping Cart</h2>

          {/* Map through every item in the basket and render it on the screen */}
          {basket.map((item, index) => (
            <CheckoutProduct
              key={index}
              id={item.id} /* <--- The crucial ID for the remove button */
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;