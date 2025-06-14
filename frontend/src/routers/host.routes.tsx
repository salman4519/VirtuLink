import React from "react";
import { Routes, Route } from "react-router-dom";
import HostProfile from "../pages/host/Profile";


const HostRoutes: React.FC = () => {
  


  return (
    <Routes>
      <Route path="host/profile" element={<HostProfile/>}/>
    </Routes>
  );
};

export default HostRoutes;