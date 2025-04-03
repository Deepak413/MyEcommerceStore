// import React from "react";
// import "./Contact.css";
// import { Button } from "@mui/material";

// const Contact = () => {
//   return (
//     <div className="contactContainer">
//       <a className="mailBtn" href="mailto:deepakdhaker343@gmail.com">
//         <Button>Contact: deepakdhaker343@gmail.com</Button>
//       </a>
//     </div>
//   );
// };

// export default Contact;


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
    <div className="contact_us">
      {/* Header Section */}
      <div className="contact_banner">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Get in touch with us.</p>
      </div>

      {/* Contact Form */}
      <div className="contact_container">
        <div className="contact_form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Contact Details Section */}
        <div className="contact_details">
          <h2>Contact Information</h2>
          <p><FaMapMarkerAlt /> 123 Tech Street, Silicon Valley, CA</p>
          <p><FaPhone /> +1 234 567 890</p>
          <p><FaEnvelope /> support@gadgethub.com</p>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="contact_map">
        <h2>Find Us Here</h2>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093687!2d144.9537363153582!3d-37.8162797420215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5dfc639e7f%3A0x5f3b68de1e6aab3!2sTech%20Store!5e0!3m2!1sen!2sus!4v1614021520373!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
