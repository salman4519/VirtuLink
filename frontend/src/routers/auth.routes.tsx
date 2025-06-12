import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/Common/Auth";
import Home from "../pages/Common/Landing";
import VerityOtp from "../pages/Common/VerifyOtp"
import ForgotPasswordPage from "../pages/Common/ForgotPassword";

const UserRoutes: React.FC = () => {
  


  return (
    <Routes>
     <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
     <Route path="/auth" element={<Auth/>}/>
     <Route path="/verify-otp" element={<VerityOtp/>}/>
     <Route path="/" element={<Home/>}/>
        
        
    </Routes>
  );
};

export default UserRoutes;