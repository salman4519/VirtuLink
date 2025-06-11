import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Common/Signup";
import Login from "../pages/Common/Login";
import Home from "../pages/Common/Landing";
import VerityOtp from "../pages/Common/VerifyOtp"
import ForgotPasswordPage from "../pages/Common/ForgotPassword";

const UserRoutes: React.FC = () => {
  


  return (
    <Routes>
     <Route path="/login" element={<Login/>}/>
     <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
     <Route path="/signup" element={<Signup/>}/>
     <Route path="/verify-otp" element={<VerityOtp/>}/>
     <Route path="/" element={<Home/>}/>
        
        
    </Routes>
  );
};

export default UserRoutes;