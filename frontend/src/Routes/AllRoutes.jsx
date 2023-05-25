import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";
import PrivateRoute from "../Routes/PriveateRoute";
import DealerInventry from "../Pages/DealerInventry";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/inventry"
        element={
          <PrivateRoute>
            <DealerInventry />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;