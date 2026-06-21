import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { deleteProductReset } from "../../reducers/productReducer";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import InventoryIcon from "@mui/icons-material/Inventory";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.adminProducts);

  const { error: deleteError, isDeleted } = useSelector((state) => state.productUpdateDelete);

  console.log("🛍️ Admin Products Data:", {
    totalProducts: products?.length,
    products: products
  });

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  useEffect(() => {
    dispatch(getAdminProduct());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      navigate('/admin/dashboard');
      dispatch(deleteProductReset());
    }

  }, [dispatch, error, deleteError, navigate, isDeleted]);

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
      minWidth: 250,
      flex: 1,
      align: "left",
      headerAlign: "left",
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
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 110,
      flex: 0.25,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <span className="priceCell">₹{params.row.price.toLocaleString()}</span>
      ),
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.25,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className={`stockCell ${params.row.stock > 0 ? "inStock" : "outOfStock"}`}>
          {params.row.stock > 0 ? (
            <div className="stockBadge">{params.row.stock}</div>
          ) : (
            <div className="outOfStockBadge">Out of Stock</div>
          )}
        </div>
      ),
    },
    {
      field: "reviews",
      headerName: "Reviews",
      minWidth: 100,
      flex: 0.2,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <div className="reviewCell">
          <StarIcon className="reviewIcon" />
          <span>{params.row.reviews}</span>
        </div>
      ),
    },
    {
      field: "actions",
      flex: 0.25,
      headerName: "Actions",
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <div className="actionCell">
          <Link
            to={`/admin/product/${params.row.id}`}
            className="editBtn"
          >
            <EditIcon />
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteProductHandler(params.row.id);
            }}
            className="deleteBtn"
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const rows = products?.map((item) => ({
    id: item._id,
    stock: item.Stock,
    price: item.price,
    name: item.name,
    image: item.images?.[0]?.url || "/default-product.png",
    reviews: item.numOfReviews || 0,
  })) || [];

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <motion.div
          className="productListContainer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="productListHeader">
            <div className="headerContent">
              <div className="headerIcon">
                <InventoryIcon />
              </div>
              <div className="headerText">
                <h1>All Products</h1>
                <p>Manage and view all your products</p>
              </div>
            </div>
            <div className="headerStats">
              <div className="stat">
                <span className="statLabel">Total</span>
                <span className="statValue">{products?.length || 0}</span>
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
              getRowHeight={() => 65}
              sx={{
                height: "calc(100vh - 400px)",
                "& .MuiDataGrid-root": {
                  border: "none",
                  backgroundColor: "transparent",
                },
                "& .MuiDataGrid-virtualScroller": {
                  scrollBehavior: "smooth",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #f0f0f0",
                  padding: "14px !important",
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#fff8f0",
                  borderBottom: "2px solid #ffaa2c",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                },
                "& .MuiDataGrid-row": {
                  height: "75px !important",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "#fff8f0",
                    boxShadow: "inset 0 0 8px rgba(255, 170, 44, 0.08)",
                  },
                },
              }}
            />
          </div>
        </motion.div>
      </div>
    </Fragment>
  );
};

export default ProductList;
