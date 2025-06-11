import React, { useState } from "react";
import "./Contact.css"; // Import CSS for styling
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <p className="sub-title">DON'T BE A STRANGER</p>
        <h1 className="title">CONTACT US</h1>
        <hr className="divider" />
      </div>

      <div className="contact-cards">
        <div className="contact-card">
          <FaPhone size={40} className="icon" />
          <h3>PHONE NUMBER</h3>
          <p>929-242-6868</p>
        </div>
        <div className="contact-card">
          <FaPhone size={40} className="icon" />
          <h3>EMAIL</h3>
          <p>contact@info.com</p>
        </div>
        <div className="contact-card">
          <FaPhone size={40} className="icon" />
          <h3>ADDRESS</h3>
          <p>123 Fifth Avenue, New York, NY 10160</p>
        </div>
      </div>

      <div className="contact-footer">
        <p className="sub-title">MESSAGE US</p>
        <h2 className="title">GET IN TOUCH</h2>
        <hr className="divider" />

        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label>
                Name <span>*</span>
              </label>
              <input type="text" placeholder="" required />
            </div>
          </div>

          <div className="form-group">
            <label>
              Email <span>*</span>
            </label>
            <input type="email" placeholder="" required />
          </div>

          <div className="form-group">
            <label>
              Message <span>*</span>
            </label>
            <textarea rows="5" placeholder="" required></textarea>
          </div>

          <button type="submit" className="send-button">
            SEND
          </button>
        </form>

        <div className="contact-map">
          <p className="sub-title">VISIT US</p>
          <h2 className="title">FIND US HERE</h2>
          <hr className="divider" />
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093687!2d144.9537363153582!3d-37.8162797420215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5dfc639e7f%3A0x5f3b68de1e6aab3!2sTech%20Store!5e0!3m2!1sen!2sus!4v1614021520373!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
