import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <>
        <footer id='footer'>
            <div className="leftFooter">
                <h4>DOWNLOAD OUT APP</h4>
                <p>Download App for android and IOS mobile phone</p>
            </div>

            <div className="midFooter">
                <h1>ECOMMERCE</h1>
                <p>We sell only quality products</p>
                <p>Copyright 2023 &copy; DeepakDhaker</p>
            </div>

            <div className="rightFooter">
                <h4>Follow us</h4>
                <a href="https://leetcode.com/DeepakDhaker/">Instagram</a>
                
            </div>
        </footer>
    </>
  )
}

export default Footer