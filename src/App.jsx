import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // This imports your Dark Mode CSS!
import Header from './components/Header';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Payment from './pages/Payment';
import Orders from './pages/Orders';
import Footer from './components/Footer';
import { auth } from './firebase';
import { useStateValue } from './context/StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ProductDetail from './pages/ProductDetail';

// Replace with your real Stripe Publishable Key
const promise = loadStripe('pk_test_51YOUR_KEY_HERE...');

function App() {
  // 1. Pulling darkMode out of the global state here
  const [{ darkMode }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({ type: 'SET_USER', user: authUser });
      } else {
        dispatch({ type: 'SET_USER', user: null });
      }
    });
  }, []);

  return (
    <Router>
      {/* 2. The magic happens here: dynamically switching the class name */}
      <div 
        className={darkMode ? "app dark-mode" : "app"} 
        style={{ 
          fontFamily: 'sans-serif', 
          margin: 0, 
          padding: 0, 
          minHeight: '100vh',
          // Dynamically change the background behind the cards
          backgroundColor: darkMode ? '#121212' : '#eaeded' 
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/payment" element={
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
              <Footer />
            </>
          } />
          <Route path="/product/:id" element={<><Header /><ProductDetail /><Footer /></>} />
          <Route path="/orders" element={<><Header /><Orders /><Footer /></>} />
          <Route path="/checkout" element={<><Header /><Checkout /><Footer /></>} />
          <Route path="/" element={<><Header /><Home /><Footer /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;