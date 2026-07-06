import React from 'react';
import './Product.css';
import { useStateValue } from '../context/StateProvider';
import { useNavigate } from 'react-router-dom'; // 1. Import Navigate

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate(); // 2. Initialize it

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: { id, title, image, price, rating },
    });
  };

  // 3. Create a function to go to the details page
  const viewProduct = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product">
      <div className="product__info">
        {/* Add onClick to the title */}
        <p onClick={viewProduct} style={{ cursor: 'pointer' }}>{title}</p>
        <p className="product__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating).fill().map((_, i) => (<p key={i}>⭐</p>))}
        </div>
      </div>

      {/* Add onClick to the image */}
      <img src={image} alt={title} onClick={viewProduct} style={{ cursor: 'pointer' }} />
      
      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
}

export default Product;