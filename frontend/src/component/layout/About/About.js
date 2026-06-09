import React from "react";
import "./aboutSection.css"; // Import CSS for styling
import aboutImage from "../../../images/aboutbg.jpg";
import { FaLaptop, FaMobileAlt, FaCamera, FaTabletAlt, FaHeadphones, FaTv } from "react-icons/fa";
import { BsSmartwatch } from "react-icons/bs";
import OurAdvantages from "../OurAdvantages";

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
            We are passionate about providing high-quality laptops, smartphones, tablets, cameras, and headphones to enhance your tech lifestyle.
          </p>
          <br />
          <p>
            Again your one-stop destination for the latest and greatest in electronic devices.
            We are passionate about providing high-quality laptops, tablets, cameras, and headphones to enhance your tech lifestyle.
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
          Our mission is to deliver exclusive electronics at competitive prices while ensuring exceptional customer service.
          We believe in offering **the latest technology** with a seamless shopping experience.
        </p>
      </div>

      {/* Why Choose Us Section - Card Style */}
      <div className="ourAdvantagesContainer"><OurAdvantages /></div>

      {/* Our Products Section */}
      <div className="our-products">
        <p className="our-products-subtitle">Quality Tech You Can Trust</p>
        <h2 className="our-products-title">Our Products</h2>
        <hr className="divider" />
        <div className="our-products-icons">
          <div className="our-product-item">
            <FaLaptop className="our-product-icon" />
            <p>Laptops</p>
          </div>
          <div className="our-product-item">
            <FaMobileAlt className="our-product-icon" />
            <p>Smartphones</p>
          </div>
          <div className="our-product-item">
            <FaTabletAlt className="our-product-icon" />
            <p>Tablets</p>
          </div>
          <div className="our-product-item">
            <FaCamera className="our-product-icon"  />
            <p>Cameras</p>
          </div>
          <div className="our-product-item">
            <FaHeadphones className="our-product-icon" />
            <p>Headphones</p>
          </div>
          <div className="our-product-item">
            <FaTv className="our-product-icon" />
            <p>TV</p>
          </div>
          <div className="our-product-item">
            <BsSmartwatch className="our-product-icon" />
            <p>Smartwatch</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;