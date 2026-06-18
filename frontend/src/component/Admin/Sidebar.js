import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon />
          Dashboard
        </p>
      </Link>

      <div className="sidebarSection">
        <div className="sidebarSectionTitle">Products</div>

        <div className="subMenu">
          <Link to="/admin/products">
            <p>
              <PostAddIcon />
              All Products
            </p>
          </Link>

          <Link to="/admin/product">
            <p>
              <AddIcon />
              Create Product
            </p>
          </Link>
        </div>
      </div>

      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>

      <Link to="/admin/users">
        <p>
          <PeopleIcon />
          Users
        </p>
      </Link>

      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;