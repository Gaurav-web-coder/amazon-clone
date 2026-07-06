import React from 'react';
import './Subtotal.css';
import { useStateValue } from '../context/StateProvider';
import { getBasketTotal } from '../context/reducer';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook

function Subtotal() {
  const [{ basket }] = useStateValue();
  const navigate = useNavigate(); // 2. Initialize the hook
  
  const rawTotal = getBasketTotal(basket);

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(rawTotal);

  return (
    <div className="subtotal">
      <p>
        Subtotal ({basket.length} items): <strong>{formattedTotal}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>

      {/* 3. Attach the navigation to the click event */}
      <button onClick={() => navigate('/payment')}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;