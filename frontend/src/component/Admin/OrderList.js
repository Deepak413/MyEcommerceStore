import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { deleteOrderReset } from "../../reducers/orderReducer";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  console.log("OrderList.js : Orders Data:", orders);
  console.log("OrderList.js : deleteError:", deleteError);

  const deleteOrderHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(id));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate('/admin/orders');

      dispatch(deleteOrderReset());
    }

    dispatch(getAllOrders());
  }, [dispatch, toast, error, deleteError, isDeleted]);

  const columns = [
    {
      field: "image",
      headerName: "Image",
      minWidth: 90,
      flex: 0.25,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <div className="productImageCell">
          <img src={params.row.image} alt={params.row.name} />
        </div>
      ),
    },

    {
      field: "name",
      headerName: "Product Name",
      minWidth: 350,
      flex: 1,
      renderCell: (params) => (
        <div className="productNameCell">
          <span>
            {params.row.name.length > 45
              ? `${params.row.name.substring(0, 45)}...`
              : params.row.name}
          </span>
        </div>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.4,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div
          className={`statusBadge ${params.row.status === "Delivered"
            ? "delivered"
            : "processing"
            }`}
        >
          {params.row.status}
        </div>
      ),
    },

    {
      field: "amount",
      headerName: "Total Price",
      minWidth: 170,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <span className="priceCell">
          ₹{params.row.amount.toLocaleString()}
        </span>
      ),
    },

    {
      field: "actions",
      flex: 0.25,
      headerName: "Actions",
      minWidth: 140,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="actionCell">
          <Link
            to={`/admin/order/${params.row.id}`}
            className="editBtn"
          >
            <EditIcon />
          </Link>

          <button
            className="deleteBtn"
            onClick={() => deleteOrderHandler(params.row.id)}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const rows =
    orders?.map((order) => ({
      id: order._id,
      image: order.orderItems?.[0]?.image,
      name:
        order.orderItems?.length === 1
          ? order.orderItems[0].name
          : `${order.orderItems[0].name} + ${order.orderItems.length - 1
          } more`,
      amount: order.totalPrice,
      status: order.orderStatus,
    })) || [];

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <div className="productListHeader">
            <div className="headerContent">
              <div className="headerIcon">
                <LocalShippingIcon />
              </div>

              <div className="headerText">
                <h1>All Orders</h1>
                <p>Manage customer orders</p>
              </div>
            </div>

            <div className="headerStats">
              <div className="stat">
                <span className="statLabel">Total</span>
                <span className="statValue">
                  {orders?.length || 0}
                </span>
              </div>
            </div>
          </div>

          <div className="tableWrapper">
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              hideFooter
              className="productListTable"
              getRowHeight={() => 75}
              sx={{
                "& .MuiDataGrid-cell": {
                  border: "none",
                  padding: "14px",
                },

                "& .MuiDataGrid-row": {
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",

                  "&:hover": {
                    backgroundColor: "#fff8f0",
                    transform: "translateY(-2px)",
                    transition: "all .25s ease",
                  },
                },

                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#fff8f0",
                  borderBottom: "2px solid #ffaa2c",
                  fontWeight: 700,
                },
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
