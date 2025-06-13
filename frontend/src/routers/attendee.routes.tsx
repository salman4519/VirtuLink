import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/attendee/Profile"


const UserRoutes: React.FC = () => {
  


  return (
    <Routes>
     <Route path="/dashboard" element={<Profile/>}/>
    </Routes>
  );
};

export default UserRoutes;