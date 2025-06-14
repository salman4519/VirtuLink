import React from "react";
import { Routes, Route } from "react-router-dom";

import Profile from "../pages/attendee/Profile"

const AttendeeRoutes: React.FC = () => {
  


  return (
    <Routes>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
  );
};

export default AttendeeRoutes;