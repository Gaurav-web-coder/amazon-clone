import React, { useState, useEffect } from 'react';
import './Orders.css';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useStateValue } from '../context/StateProvider';
import Order from '../components/Order';

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // Connect to Firestore and pull this specific user's orders, sorted by date
      const ordersRef = collection(db, 'users', user?.uid, 'orders');
      const q = query(ordersRef, orderBy('created', 'desc'));

      // onSnapshot gives us real-time updates if the database changes
      onSnapshot(q, (snapshot) => {
        setOrders(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })));
      });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;