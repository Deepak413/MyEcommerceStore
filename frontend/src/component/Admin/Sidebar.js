import React, { useState, useEffect } from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import MenuIcon from "@mui/icons-material/Menu";
import { RiMenu2Line } from "react-icons/ri";

import CloseIcon from "@mui/icons-material/Close";

const Sidebar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isProductsActive = location.pathname.includes("/admin/product");

  // Keep Products dropdown open when on product pages
  useEffect(() => {
    if (isProductsActive) {
      setIsProductsOpen(true);
    }
  }, [isProductsActive]);

  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.2 },
    }),
  };

  return (
    <>
      <button
        className="hamburgerBtn"
        onClick={() => setIsSidebarOpen(true)}
      >
        <RiMenu2Line />
      </button>

      {isSidebarOpen && (
        <div
          className="sidebarOverlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <motion.div
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="sidebarClose">
          <CloseIcon onClick={() => setIsSidebarOpen(false)} />
        </div>
        {/* Dashboard Link */}
        <motion.div
          custom={0}
          variants={menuItemVariants}
          initial="hidden"
          animate="visible"
        >
          <Link
            to="/admin/dashboard"
            onClick={() => setIsSidebarOpen(false)}
            className={`sidebarLink ${isActive("/admin/dashboard") ? "active" : ""}`}
          >
            <div className="linkContent">
              <DashboardIcon className="linkIcon" />
              <span>Dashboard</span>
            </div>
            {isActive("/admin/dashboard") && <div className="activeIndicator" />}
          </Link>
        </motion.div>

        {/* Products Section */}
        <motion.div
          custom={1}
          variants={menuItemVariants}
          initial="hidden"
          animate="visible"
          className="sidebarSection"
        >
          <button
            className={`sidebarSectionTitle ${isProductsActive ? "active" : ""}`}
            onClick={() => setIsProductsOpen(!isProductsOpen)}
          >
            <span>Products</span>
            <motion.div
              animate={{ rotate: isProductsOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <KeyboardArrowDownIcon className="arrowIcon" />
            </motion.div>
          </button>

          <motion.div
            className="subMenu"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isProductsOpen ? "auto" : 0,
              opacity: isProductsOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/admin/products"
              onClick={() => setIsSidebarOpen(false)}
              className={`subMenuLink ${isActive("/admin/products") ? "active" : ""}`}
            >
              <div className="linkContent">
                <PostAddIcon className="linkIcon" />
                <span>All Products</span>
              </div>
              {isActive("/admin/products") && <div className="activeIndicator" />}
            </Link>

            <Link
              to="/admin/product"
              onClick={() => setIsSidebarOpen(false)}
              className={`subMenuLink ${isActive("/admin/product") ? "active" : ""}`}
            >
              <div className="linkContent">
                <AddIcon className="linkIcon" />
                <span>Create Product</span>
              </div>
              {isActive("/admin/product") && <div className="activeIndicator" />}
            </Link>
          </motion.div>
        </motion.div>

        {/* Orders Link */}
        <motion.div
          custom={2}
          variants={menuItemVariants}
          initial="hidden"
          animate="visible"
        >
          <Link
            to="/admin/orders"
            onClick={() => setIsSidebarOpen(false)}
            className={`sidebarLink ${isActive("/admin/orders") ? "active" : ""}`}
          >
            <div className="linkContent">
              <ListAltIcon className="linkIcon" />
              <span>Orders</span>
            </div>
            {isActive("/admin/orders") && <div className="activeIndicator" />}
          </Link>
        </motion.div>

        {/* Users Link */}
        <motion.div
          custom={3}
          variants={menuItemVariants}
          initial="hidden"
          animate="visible"
        >
          <Link
            to="/admin/users"
            onClick={() => setIsSidebarOpen(false)}
            className={`sidebarLink ${isActive("/admin/users") ? "active" : ""}`}
          >
            <div className="linkContent">
              <PeopleIcon className="linkIcon" />
              <span>Users</span>
            </div>
            {isActive("/admin/users") && <div className="activeIndicator" />}
          </Link>
        </motion.div>

        {/* Reviews Link */}
        <motion.div
          custom={4}
          variants={menuItemVariants}
          initial="hidden"
          animate="visible"
        >
          <Link
            to="/admin/reviews"
            onClick={() => setIsSidebarOpen(false)}
            className={`sidebarLink ${isActive("/admin/reviews") ? "active" : ""}`}
          >
            <div className="linkContent">
              <RateReviewIcon className="linkIcon" />
              <span>Reviews</span>
            </div>
            {isActive("/admin/reviews") && <div className="activeIndicator" />}
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Sidebar;