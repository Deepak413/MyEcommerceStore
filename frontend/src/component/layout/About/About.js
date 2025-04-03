// import React from "react";
// import "./aboutSection.css";
// import { Button, Typography, Avatar } from "@mui/material";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import InstagramIcon from "@mui/icons-material/Instagram";
// const About = () => {
//   const visitInstagram = () => {
//     window.location = "https://instagram.com/deepak_dhaker_18";
//   };
//   return (
//     <div className="aboutSection">
//       <div></div>
//       <div className="aboutSectionGradient"></div>
//       <div className="aboutSectionContainer">
//         <Typography component="h1">About Us</Typography>

//         <div>
//           <div>
//             <Avatar
//               style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
//               alt="Founder"
//             />
//             <Typography>Deepak Dhaker</Typography>
//             <Button onClick={visitInstagram} color="primary">
//               Visit Instagram
//             </Button>
//             <span>
//               This is a sample wesbite made by @DeepakDhaker.
//             </span>
//           </div>
//           <div className="aboutSectionContainer2">
//             <Typography component="h2">Our Brands</Typography>
//             <a
//               href="https://www.youtube.com"
//               target="blank"
//             >
//               <YouTubeIcon className="youtubeSvgIcon" />
//             </a>

//             <a href="https://instagram.com/deepak_dhaker_18" target="blank">
//               <InstagramIcon className="instagramSvgIcon" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;



import React from "react";
import "./aboutSection.css"; // Import CSS for styling
import aboutImage from "../../../images/aboutbg.jpg";
import { FaLaptop, FaMobileAlt, FaCamera, FaTabletAlt, FaHeadphones } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-us">
      {/* Header Section */}
      <div className="about-banner">
        <h1>About Us</h1>
        <p>Your trusted store for high-quality electronic gadgets</p>
      </div>

      {/* Introduction Section */}
      <div className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            Welcome to <strong>GadgetHub</strong>, your one-stop destination for the latest and greatest in electronic devices.
            We are passionate about providing high-quality **laptops, smartphones, tablets, cameras, and headphones** to enhance your tech lifestyle.
          </p>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="About Us" />
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to deliver top-notch electronics at competitive prices while ensuring exceptional customer service. 
          We believe in offering **the latest technology** with a seamless shopping experience.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✔ Wide range of high-quality electronic gadgets</li>
          <li>✔ 100% Genuine and Branded Products</li>
          <li>✔ Competitive Prices and Special Discounts</li>
          <li>✔ Secure Payment Methods</li>
          <li>✔ Fast & Reliable Shipping</li>
          <li>✔ 24/7 Customer Support</li>
        </ul>
      </div>

      {/* Our Products Section */}
      <div className="our-products">
        <h2>Our Products</h2>
        <div className="product-icons">
          <div className="product-item">
            <FaLaptop size={50} color="#0073e6" />
            <p>Laptops</p>
          </div>
          <div className="product-item">
            <FaMobileAlt size={50} color="#28a745" />
            <p>Smartphones</p>
          </div>
          <div className="product-item">
            <FaTabletAlt size={50} color="#ff9800" />
            <p>Tablets</p>
          </div>
          <div className="product-item">
            <FaCamera size={50} color="#dc3545" />
            <p>Cameras</p>
          </div>
          <div className="product-item">
            <FaHeadphones size={50} color="#6f42c1" />
            <p>Headphones</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
