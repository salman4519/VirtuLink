import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./routers/admin.routes";
import HostRoutes from "./routers/host.routes";
import AuthRoutes from "./routers/auth.routes";
import AttendeeRoutes from "./routers/attendee.routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App: React.FC = () => {
  return (
    <Router>
      <>
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        <AuthRoutes />
        <AttendeeRoutes/>
        <HostRoutes/>
        <AdminRoutes/>
        
        {/* <HostRoutes />
        <AdminRoutes /> */}
      </>
    </Router>
  );
};

export default App;