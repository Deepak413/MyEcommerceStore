import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UpdateIcon from "@mui/icons-material/Update";

import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user.user);
  console.log("Is user is authenticated in Dashboard : ", isAuthenticated);
  console.log("Current user in Dashboard : ", user);
  const firstName = user.name.split(" ")[0];

  const { products } = useSelector((state) => state.adminProducts);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  console.log("products in Dashboard : ", products);
  console.log("orders in Dashboard : ", orders);
  console.log("users in Dashboard : ", users);

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        borderColor: "#ffaa2c",
        backgroundColor: "rgba(255, 170, 44, 0.1)",
        pointBackgroundColor: "#ffaa2c",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#ff9500",
        fill: true,
        tension: 0.4,
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#ff6b6b", "#ffaa2c"],
        hoverBackgroundColor: ["#ff5252", "#ff9500"],
        borderColor: "#fff",
        borderWidth: 2,
        data: [outOfStock, (products?.length || 0) - outOfStock],
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const statCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <motion.div
        className="dashboardContainer"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="dashboardHeader">
          <div className="headerTop">
            <div className="headerLeft">
              <div className="headerIconWrapper">
                <DashboardIcon className="headerIcon" />
              </div>
              <div className="headerTitleWrapper">
                <Typography component="h1" className="dashboardTitle">
                  Dashboard
                </Typography>
                <p className="dashboardSubtitle">
                  <UpdateIcon className="subtitleIcon" />
                  Welcome back {firstName}! Here's your store overview
                </p>
              </div>
            </div>
            <div className="headerStats">
              <div className="headerStatItem">
                <span className="headerStatLabel">Status</span>
                <span className="headerStatValue active">Active</span>
              </div>
              <div className="headerStatDivider" />
              <div className="headerStatItem">
                <span className="headerStatLabel">Last Updated</span>
                <span className="headerStatValue">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="headerDecoration" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="dashboardSummary"
        >
          <motion.div
            variants={statCardVariants}
            whileHover={{ scale: 1.05 }}
            className="totalAmountCard"
          >
            <div className="cardIcon totalIcon">
              <TrendingUpIcon />
            </div>
            <div className="cardContent">
              <p className="cardLabel">Total Revenue</p>
              <p className="cardValue">₹{totalAmount.toLocaleString()}</p>
            </div>
          </motion.div>

          <div className="dashboardSummaryBox2">
            <motion.div
              variants={statCardVariants}
              whileHover={{ scale: 1.05 }}
              className="statCard productAdminCard"
            >
              <Link to="/admin/products">
                <div className="cardIcon productIcon">
                  <InventoryIcon />
                </div>
                <div className="cardInfo">
                  <p className="cardLabel">Products</p>
                  <p className="cardNumber">{products && products.length}</p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              variants={statCardVariants}
              whileHover={{ scale: 1.05 }}
              className="statCard orderAdminCard"
            >
              <Link to="/admin/orders">
                <div className="cardIcon orderIcon">
                  <ShoppingCartIcon />
                </div>
                <div className="cardInfo">
                  <p className="cardLabel">Orders</p>
                  <p className="cardNumber">{orders && orders.length}</p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              variants={statCardVariants}
              whileHover={{ scale: 1.05 }}
              className="statCard userAdminCard"
            >
              <Link to="/admin/users">
                <div className="cardIcon userIcon">
                  <GroupIcon />
                </div>
                <div className="cardInfo">
                  <p className="cardLabel">Users</p>
                  <p className="cardNumber">{users && users.length}</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="chartsContainer">
          <motion.div
            className="chartBox lineChartBox"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="chartTitle">Revenue Trend</h3>
            <div className="lineChart">
              <Line data={lineState} options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: true,
                    labels: {
                      color: "#666",
                      font: { size: 12, weight: 600 },
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { color: "#999" },
                    grid: { color: "rgba(0,0,0,0.05)" },
                  },
                  x: {
                    ticks: { color: "#999" },
                    grid: { color: "rgba(0,0,0,0.05)" },
                  },
                },
              }} />
            </div>
          </motion.div>

          <motion.div
            className="chartBox doughnutChartBox"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="chartTitle">Stock Status</h3>
            <div className="doughnutChart">
              <Doughnut data={doughnutState} options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#666",
                      font: { size: 12, weight: 600 },
                      padding: 15,
                    },
                  },
                },
              }} />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
