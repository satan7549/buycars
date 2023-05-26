import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";
import PrivateRoute from "../Routes/PriveateRoute";
import AddCar from "../Pages/AddCar";
import CarDetail from "../Pages/CarDetail";

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
        path="/add"
        element={
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        }
      />
      <Route path="/detail/:id" element={<CarDetail />} />
    </Routes>
  );
};

export default AllRoutes;
