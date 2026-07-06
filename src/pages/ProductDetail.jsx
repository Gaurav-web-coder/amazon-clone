import React from 'react';
import { useParams } from 'react-router-dom';
import { productsData } from '../productsData';
import { useStateValue } from '../context/StateProvider';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams(); // This grabs the ID directly from the URL
  const [{ basket }, dispatch] = useStateValue();

  // Find the exact product from our database file
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return <div className="productDetail__error"><h2>Product not found!</h2></div>;
  }

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        rating: product.rating,
      },
    });
  };

  return (
    <div className="productDetail">
      <div className="productDetail__container">
        <div className="productDetail__left">
          <img src={product.image} alt={product.title} />
        </div>
        
        <div className="productDetail__right">
          <h2>{product.title}</h2>
          <div className="productDetail__rating">
            {Array(product.rating).fill().map((_, i) => (<p key={i}>⭐</p>))}
          </div>
          <h3 className="productDetail__price">₹{product.price}</h3>
          
          <div className="productDetail__description">
            <h4>About this item:</h4>
            <p>{product.description}</p>
          </div>
          
          <button onClick={addToBasket}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;