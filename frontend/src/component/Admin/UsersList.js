import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import "./productList.css";
import "./UsersList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { deleteUserReset } from "../../reducers/userReducer";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.profile);

  console.log("UsersList.js : Users Data:", users);
  console.log("UsersList.js : deleteError:", deleteError);

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
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
      toast.success("User Deleted Successfully!");
      navigate('/admin/users');
      dispatch(deleteUserReset());
    }

    dispatch(getAllUsers());
  }, [dispatch, toast, error, deleteError, navigate, isDeleted]);

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      minWidth: 100,
      flex: 0.25,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <div className="userAvatarCell">
          <img
            src={params.row.avatar}
            alt={params.row.name}
          />
        </div>
      ),
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 220,
      flex: 0.6,
      renderCell: (params) => (
        <div className="productNameCell">
          <span>{params.row.name}</span>
        </div>
      ),
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      flex: 1,
      renderCell: (params) => (
        <div className="emailCell">
          {params.row.email}
        </div>
      ),
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 140,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div
          className={`roleBadge ${params.row.role === "admin"
            ? "adminRole"
            : "userRole"
            }`}
        >
          {params.row.role}
        </div>
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
            to={`/admin/user/${params.row.id}`}
            className="editBtn"
          >
            <EditIcon />
          </Link>

          <button
            className="deleteBtn"
            onClick={() => deleteUserHandler(params.row.id)}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const rows =
    users?.map((item) => ({
      id: item._id,
      avatar: item.avatar?.url,
      role: item.role,
      email: item.email,
      name: item.name,
    })) || [];

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <div className="productListHeader">
            <div className="headerContent">
              <div className="headerIcon">
                <PeopleAltIcon />
              </div>

              <div className="headerText">
                <h1>All Users</h1>
                <p>Manage platform users and permissions</p>
              </div>
            </div>

            <div className="headerStats">
              <div className="stat">
                <span className="statLabel">Total</span>
                <span className="statValue">
                  {users?.length || 0}
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
              getRowHeight={() => 85}
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

export default UsersList;
