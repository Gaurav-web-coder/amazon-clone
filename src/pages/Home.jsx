import React from 'react';
import './Home.css';
import Product from '../components/Product';
import { useStateValue } from '../context/StateProvider';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Requires a loader
import { productsData } from '../productsData';
function Home() {
  const [{ searchTerm }] = useStateValue();

  
  const filteredProducts = productsData.filter(product => 
    product.title.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  return (
    <div className="home">
      <div className="home__container">
        
        {/* THE NEW CAROUSEL BANNER */}
        <div className="home__carousel">
          <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
          >
            <div>
              <img src="https://assets.aboutamazon.com/dims4/default/805effa/2147483647/strip/false/crop/1920x1080+0+0/resize/1486x836!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F2d%2F49%2Fabd3719b41aea4605bb51e4d8d72%2Fsubs-pre-order-consent-background-image-cb578173463.jpg" alt="Prime Day" />
            </div>
            <div>
              <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200_V3._CB558389732_.jpg" alt="Mobiles" />
            </div>
            <div>
              <img src="https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/news/wi/5a2b878420b31.jpg" alt="Beauty" />
            </div>
          </Carousel>
        </div>

        
        {/* The Product Grid */}
        <div className="home__row">
          {filteredProducts.length === 0 ? (
            <h3 style={{ padding: '20px', zIndex: 1 }}>No products match your search.</h3>
          ) : (
            filteredProducts.map(product => (
              <Product
                key={product.id}
                id={product.id} /* <--- WE MISSED THIS LINE! */
                title={product.title}
                price={product.price}
                rating={product.rating}
                image={product.image}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;