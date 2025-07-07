import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminProfile from '../pages/admin/Profile'
import Users from '../pages/admin/Users'
import Events from '../pages/admin/Events'
import ProtectedRoute from "../components/ProtectedRoute";

const AdminRoutes: React.FC = () => {
  


  return (
    <Routes>
      <Route element={<ProtectedRoute requiredRoles={["admin"]} />}>
        <Route path="/profile" element={<AdminProfile/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/events" element={<Events/>}/>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;