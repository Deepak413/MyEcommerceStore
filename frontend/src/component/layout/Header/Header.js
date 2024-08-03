import React from 'react'
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.png";
import { BsFillCartFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { BiSolidUserPin } from 'react-icons/bi';


const options = {
    burgerColorHover: "#eb4034",
    burgerColor: "wheat",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    logoAnimationTime: "0.1",
    logoTransition: "0.1",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1AnimationTime: "0.1",
    searchIconAnimationTime: "0.1",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    searchIconUrl: "/search",
    cartIconUrl: "/cart",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
    cartIcon :true,
    CartIconElement: BsFillCartFill,
    searchIcon :true,
    SearchIconElement: ImSearch,
    profileIcon :true,
    ProfileIconElement: BiSolidUserPin,
  };

const Header = () => {
  return (
    <>
        <ReactNavbar {...options} />
    </>
  )
}

export default Header