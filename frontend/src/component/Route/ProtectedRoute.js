// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, Route } from "react-router-dom";

// //This is only for those routes which are for logged in user. 
// //this is to overcome errors after refresh 

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const navigate = useNavigate();
//   const { loading, isAuthenticated } = useSelector((state) => state.user);

//   return (
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               return navigate("/login");
//             }

//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;