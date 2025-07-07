import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import HostProfile from "../pages/host/Profile";
import CreateEvent from "../pages/host/CreateEvent"


const HostRoutes: React.FC = () => {
  


  return (
    <Routes>
      <Route element={<ProtectedRoute requiredRoles={["host"]} />}>
        <Route path="/profile" element={<HostProfile/>}/>
        <Route path="/create-event" element={<CreateEvent/>}/>
      </Route>
    </Routes>
  );
};

export default HostRoutes;