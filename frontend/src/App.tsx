import { BrowserRouter as Router } from "react-router-dom";
// import AdminRoutes from "../src/routes/adminRoutes";
// import HostRoutes from "../src/routes/hostRoutes";
import AttendeeRoutes from "../src/routes/attendeeRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App: React.FC = () => {
  return (
    <Router>
      <>
        <ToastContainer position="top-right" autoClose={3000} />
        <AttendeeRoutes />
        {/* <HostRoutes />
        <AdminRoutes /> */}
      </>
    </Router>
  );
};

export default App;