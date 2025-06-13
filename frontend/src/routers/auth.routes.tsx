import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../pages/Common/Auth";
import Home from "../pages/Common/Landing";
import VerityOtp from "../pages/Common/VerifyOtp"
import ForgotPasswordPage from "../pages/Common/ForgotPassword";
import Profile from "../pages/attendee/Profile"
import HostProfile from "../pages/host/Profile";
import AdminProfile from '../pages/admin/Profile'

const UserRoutes: React.FC = () => {
  


  return (
    <Routes>
     <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
     <Route path="/auth" element={<Auth/>}/>
     <Route path="/verify-otp" element={<VerityOtp/>}/>
     <Route path="/" element={<Home/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/host-profile" element={<HostProfile/>}/>
      <Route path="/admin-profile" element={<AdminProfile/>}/>

    </Routes>
  );
};

export default UserRoutes;