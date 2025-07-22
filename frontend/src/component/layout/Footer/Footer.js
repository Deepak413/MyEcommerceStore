import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";


import './Footer.css';

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="footer_container">
                    <div className="footer_container_left">
                        <div className="footer_logo" onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                            <NavLink to="/">SHOPPINGG</NavLink>
                        </div>
                        <div className="footer_logo1" onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }} >
                            <NavLink to="/">KARO</NavLink>
                            <FaPersonWalkingLuggage size={45} />
                        </div>
                        <div className="footer_address_detail">
                            <div className="footer_address_card">
                                <div className="footer_address_cardicon"><i class="zmdi zmdi-pin"></i></div>
                                <div className="footer_address_cardtext">12, Maiden Street, Delhi 311602</div>
                            </div>
                            <div className="footer_address_card">
                                <div className="footer_address_cardicon"><i class="zmdi zmdi-phone"></i></div>
                                <div className="footer_address_cardtext">+91 99824*****</div>
                            </div>
                        </div>
                    </div>
                    <div className="footer_links">
                        <h5>LINKS</h5>
                        <ul className="footer_links_list">
                            <li>
                                <NavLink to="/" className="footer_link" onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/products" className="footer_link" onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>Products</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="footer_link" onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>Contact</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="footer_link"onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }} >About</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="footer_container_right">
                        <div className="footer_mail_container">
                            <h5>SUBSCRIBE AND STAY UPDATED</h5>
                            <input type="email" placeholder='E-mail' />
                            <button>SUBSCRIBE</button>
                        </div>
                        <div className="footer_info_container">
                            <div className="footer_social_card">
                                <h3>GET SOCIAL</h3>
                                <div className="footer_social_cardlinks">
                                    <NavLink to='https://www.instagram.com/deepak_dhaker_18/' target="_blank" className=" insta_icon "><RiInstagramFill size={40} /></NavLink>
                                    <NavLink to='http://www.linkedin.com/in/deepak-dhaker' target="_blank" className=" linkedin_icon "><FaLinkedin size={40} /></NavLink>
                                    <NavLink to='https://www.instagram.com/deepak_dhaker_18/' target="_blank" className=" fb_icon"><FaFacebookSquare size={40} /></NavLink>
                                    <NavLink to='https://x.com/DeepakDhaker413' target="_blank" className=" twitter_icon "><FaSquareTwitter size={40} /></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_line">
                    Colyright @ 2023 | All Rights Reserved | DEEPAK DHAKER
                </div>

            </div>
        </>
    )
}

export default Footer;