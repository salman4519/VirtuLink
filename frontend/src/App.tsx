import AdminRoutes from "./routers/admin.routes";
import HostRoutes from "./routers/host.routes";
import AuthRoutes from "./routers/auth.routes";
import AttendeeRoutes from "./routers/attendee.routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AuthRoutes />} />
          <Route path="/attendee/*" element={<AttendeeRoutes />} />
          <Route path="/host/*" element={<HostRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;