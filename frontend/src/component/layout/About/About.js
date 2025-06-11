import React from "react";
import "./aboutSection.css"; // Import CSS for styling
import aboutImage from "../../../images/aboutbg.jpg";
import { FaLaptop, FaMobileAlt, FaCamera, FaTabletAlt, FaHeadphones } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-us">
      {/* Header Section */}
      <div className="about-banner">
        <p className="sub-title">Your trusted store for high-quality electronic gadgets</p>
        <h1 className="title">ABOUT US</h1>
        <hr className="divider" />
      </div>

      {/* Introduction Section */}
      <div className="about-content">
        <div className="about-text">
          <h2>WHO WE ARE</h2>
          <p>
            Welcome to <strong style={{ color: "#f1bd71" }}>SHOPPINGG KARO</strong>, your one-stop destination for the latest and greatest in electronic devices.
            We are passionate about providing high-quality **laptops, smartphones, tablets, cameras, and headphones** to enhance your tech lifestyle.
          </p>
          <br />
          <p>
            your one-stop destination for the latest and greatest in electronic devices.
            We are passionate about providing high-quality **laptops, smartphones, tablets, cameras, and headphones** to enhance your tech lifestyle.
          </p>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="About Us" />
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <p className="mission-subtitle">Your Needs, Our Mission</p>
        <h2 className="mission-title">Our Mission</h2>
        <hr className="divider" />
        <p className="mission-text">
          Our mission is to deliver top-notch electronics at competitive prices while ensuring exceptional customer service.
          We believe in offering **the latest technology** with a seamless shopping experience.
        </p>
      </div>

      {/* Why Choose Us Section - Card Style */}
      <div className="service-cards-container">
        <p className="service-subtitle">Why Choose Us</p>
        <h2 className="service-title">Our Advantages</h2>
        <hr className="divider" />
        <div className="service-cards">
          <div className="service-card">
            {/* <div className="service-icon">🚚</div> */}
            <FaCamera size={20} className="service-icon" />
            <h3>Fast Delivery</h3>
            <p>Quick and reliable delivery service across the country.</p>
          </div>
          <div className="service-card">
            {/* <div className="service-icon">📦</div> */}
            <FaHeadphones size={20} className="service-icon" />
            <h3>Free Shipping</h3>
            <p>No extra cost on standard deliveries for select products.</p>
          </div>
          <div className="service-card">
            {/* <div className="service-icon">🔁</div> */}
            <FaMobileAlt size={20} className="service-icon" />
            <h3>Easy Returns</h3>
            <p>30-day hassle-free returns on all eligible products.</p>
          </div>
        </div>
      </div>

      {/* Our Products Section */}
      <div className="our-products">
        <p className="our-products-subtitle">Quality Tech You Can Trust</p>
        <h2 className="our-products-title">Our Products</h2>
        <hr className="divider" />
        <div className="our-products-icons">
          <div className="our-product-item">
            <FaLaptop size={45} color="#5e5e5e" />
            <p>Laptops</p>
          </div>
          <div className="our-product-item">
            <FaMobileAlt size={45} color="#5e5e5e" />
            <p>Smartphones</p>
          </div>
          <div className="our-product-item">
            <FaTabletAlt size={45} color="#5e5e5e" />
            <p>Tablets</p>
          </div>
          <div className="our-product-item">
            <FaCamera size={45} color="#5e5e5e"  />
            <p>Cameras</p>
          </div>
          <div className="our-product-item">
            <FaHeadphones size={45} color="#5e5e5e" />
            <p>Headphones</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;