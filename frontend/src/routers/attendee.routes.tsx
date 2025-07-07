import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/attendee/Profile"

const AttendeeRoutes: React.FC = () => {
  


  return (
    <Routes>
      <Route element={<ProtectedRoute requiredRoles={["attendee"]} />}>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
    </Routes>
  );
};

export default AttendeeRoutes;