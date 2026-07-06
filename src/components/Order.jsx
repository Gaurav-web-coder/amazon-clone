import React from 'react';
import './Order.css';
import Product from './Product';

function Order({ order }) {
  // Convert Stripe's timestamp into a readable date
  const orderDate = new Date(order.data.created * 1000).toLocaleString();

  return (
    <div className="order">
      <h2>Order</h2>
      <p>{orderDate}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      
      {/* Map through the items bought in this specific order */}
      {order.data.basket?.map(item => (
        <Product
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
        />
      ))}
      
      {/* Stripe processes in subunits (paise), so we divide by 100 to get rupees */}
      <h3 className="order__total">Order Total: ₹{order.data.amount / 100}</h3>
    </div>
  );
}

export default Order;