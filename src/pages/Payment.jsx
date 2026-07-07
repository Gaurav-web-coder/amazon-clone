import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from '../context/StateProvider';
import CheckoutProduct from '../components/CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getBasketTotal } from '../context/reducer';
import axios from '../axios';
import { db } from '../firebase'; // Make sure your firebase.js exports db!
import { doc, setDoc } from "firebase/firestore";
export default function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      // If the basket is empty, don't ask for a secret
      if (getBasketTotal(basket) === 0) return;

      try {
        const response = await axios({
          method: 'post',
          // Stripe expects the total in a currencies subunits (e.g., paise/cents)
          // CRUCIAL FIX: Math.round completely removes any hidden decimals!
          url: `/payments/create?total=${Math.round(getBasketTotal(basket) * 100)}`
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Backend Error - failed to get secret:", error);
      }
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    // Stop the form from refreshing the page
    event.preventDefault();
    setProcessing(true);

    // Make sure we have a connection to the backend before trying to pay
    if (!clientSecret) {
      setError("Waiting for secure payment connection... Please try again.");
      setProcessing(false);
      return;
    }

    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      // SAFETY CHECK: If Stripe returns an error (like insufficient funds or failed auth), stop here!
      if (payload.error) {
        setError(payload.error.message);
        setProcessing(false);
        return;
      }

      // If we pass the check, the payment worked! We are safe to use paymentIntent.id
      const paymentIntent = payload.paymentIntent;

      // Save the order to our Firebase Database
      if (user) {
        // THIS IS THE NEW CODE:
        const orderRef = doc(db, 'users', user?.uid, 'orders', paymentIntent.id);

     await setDoc(orderRef, {
      basket: basket,
      amount: paymentIntent.amount,
      created: paymentIntent.created
});
      }

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      // Empty the cart in our global state
      dispatch({
        type: 'EMPTY_BASKET'
      });

      // Kick them to the Orders page
      navigate('/orders', { replace: true });

    } catch (err) {
      // Catch any other JavaScript errors
      setError(err.message);
      setProcessing(false);
    }
  };

  const handleChange = event => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (
            <Link to="/checkout">{basket?.length} items</Link>
          )
        </h1>

        {/* Payment section - delivery address */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>New Delhi, India</p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - Payment method */}
        <div className='payment__section'>
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe Card Input Form */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className='payment__priceContainer'>
                <p style={{ marginTop: '15px', marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>
                  Order Total: ₹{getBasketTotal(basket)}
                </p>
                <button disabled={processing || disabled || succeeded || getBasketTotal(basket) === 0}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}