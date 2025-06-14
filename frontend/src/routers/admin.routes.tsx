import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminProfile from '../pages/admin/Profile'
import Users from '../pages/admin/Users'
import Events from '../pages/admin/Events'

const AdminRoutes: React.FC = () => {
  


  return (
    <Routes>
      <Route path="/admin-profile" element={<AdminProfile/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/events" element={<Events/>}/>
    </Routes>
  );
};

export default AdminRoutes;