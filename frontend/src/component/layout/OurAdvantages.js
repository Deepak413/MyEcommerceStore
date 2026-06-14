import React, { Fragment } from 'react';
import "./OurAdvantages.css";
import { FaLaptop, FaMobileAlt, FaCamera, FaTabletAlt, FaHeadphones } from "react-icons/fa";

const OurAdvantages = () => {
    return (
        <Fragment>
            <div className="service-cards-container">
                <p className="service-subtitle">Why Choose Us</p>
                <h2 className="service-title">Our Advantages</h2>
                <hr className="divider" />
                <div className="service-cards">
                    <div className="service-card">
                        <FaCamera size={20} className="service-icon" />
                        <h3>Fast Delivery</h3>
                        <p>Quick and reliable delivery service across the country.</p>
                    </div>
                    <div className="service-card">
                        <FaHeadphones size={20} className="service-icon" />
                        <h3>Free Shipping</h3>
                        <p>No extra cost on standard deliveries for select products.</p>
                    </div>
                    <div className="service-card">
                        <FaMobileAlt size={20} className="service-icon" />
                        <h3>Easy Returns</h3>
                        <p>30-day hassle-free returns on all eligible products.</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default OurAdvantages;