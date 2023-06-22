import "./App.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Layout/Navbar";
import AppRoutes from "./components/Routing/AppRoutes";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <AppRoutes />
      {/* toast notification for api calls */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
