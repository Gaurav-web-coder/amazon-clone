import React from 'react';
import { Search, ShoppingCart, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useStateValue } from '../context/StateProvider';
import { auth } from '../firebase';

function Header() {
  const [{ basket, user, searchTerm, darkMode }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <div className="header">
      {/* 1. Amazon Logo Link */}
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
        <div className="header__logo">
          <h2>amazon</h2>
        </div>
      </Link>
      
      {/* 2. Real-Time Search Bar */}
      <div className="header__search">
        <input 
          type="text" 
          className="header__searchInput" 
          value={searchTerm || ""}
          onChange={(e) => dispatch({
            type: 'SET_SEARCH_TERM',
            searchTerm: e.target.value
          })}
        />
        <div className="header__searchIcon">
          <Search size={20} />
        </div>
      </div>

      {/* 3. Navigation Options */}
      <div className="header__nav">
        
        {/* User Login/Logout */}
        <Link to={!user && '/login'} style={{ textDecoration: 'none' }}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello {!user ? 'Guest' : user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>

        {/* RETURNS & ORDERS */}
        <Link to="/orders" style={{ textDecoration: 'none' }}>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        {/* DARK MODE TOGGLE */}
        <div 
          className="header__option" 
          onClick={toggleDarkMode} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {darkMode ? <Sun size={24} color="#febd69" /> : <Moon size={24} />}
        </div>

        {/* Shopping Basket */}
        <Link to="/checkout" style={{ textDecoration: 'none' }}>
          <div className="header__optionBasket">
            <ShoppingCart />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Header;