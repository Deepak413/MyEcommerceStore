import React, { Fragment, useEffect, useState } from "react";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaData from "../layout/MetaData";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";

import SideBar from "./Sidebar";
import { deleteReviewReset } from "../../reducers/productReducer";
import { useNavigate } from "react-router-dom";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  console.log("ProductReviews.js : Product Reviews Data:", reviews);

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      navigate('/admin/reviews');
      dispatch(deleteReviewReset());
    }
  }, [dispatch, toast, error, deleteError, navigate, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 180,
      flex: 0.4,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <div
          className={
            params.row.rating >= 3
              ? "ratingBadge good"
              : "ratingBadge bad"
          }
        >
          ⭐ {params.row.rating}
        </div>
      ),
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              className="deleteReviewBtn"
              onClick={() => deleteReviewHandler(params.row.id)}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows =
    reviews?.map((item) => ({
      id: item._id,
      rating: item.rating,
      comment: item.comment,
      user: item.name,
    })) || [];

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading || !productId}
            >
              Search
            </Button>
          </form>

          {reviews?.length > 0 ? (
            <div className="reviewsTableWrapper">
              <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                className="productListTable"
                hideFooter
                getRowHeight={() => 85}
                sx={{
                  border: "none",

                  "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "#fff8f0",
                    borderBottom: "2px solid #ffaa2c",
                    fontWeight: 700,
                  },

                  "& .MuiDataGrid-row": {
                    marginBottom: "12px",
                    backgroundColor: "#fff",
                    borderRadius: "14px",

                    "&:hover": {
                      backgroundColor: "#fff8f0",
                    },
                  },

                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              />
            </div>
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
