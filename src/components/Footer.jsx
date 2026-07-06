import React from 'react';
import './Footer.css';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer">
      <div className="footer__backToTop" onClick={scrollToTop}>
        Back to top
      </div>

      <div className="footer__linksContainer">
        <div className="footer__linkColumn">
          <h3>Get to Know Us</h3>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press Releases</li>
            <li>Amazon Science</li>
          </ul>
        </div>

        <div className="footer__linkColumn">
          <h3>Connect with Us</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>

        <div className="footer__linkColumn">
          <h3>Make Money with Us</h3>
          <ul>
            <li>Sell on Amazon</li>
            <li>Sell under Amazon Accelerator</li>
            <li>Protect and Build Your Brand</li>
            <li>Amazon Global Selling</li>
            <li>Become an Affiliate</li>
            <li>Fulfilment by Amazon</li>
          </ul>
        </div>

        <div className="footer__linkColumn">
          <h3>Let Us Help You</h3>
          <ul>
            <li>COVID-19 and Amazon</li>
            <li>Your Account</li>
            <li>Returns Centre</li>
            <li>100% Purchase Protection</li>
            <li>Help</li>
          </ul>
        </div>
      </div>
      
      <div className="footer__bottom">
        <img 
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
          alt="Amazon Logo" 
        />
      </div>
    </div>
  );
}

export default Footer;