import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import LoginRegistrationForm from "./components/Forms/LoginRegistrationForm";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/" element={<div>/</div>} />
        <Route
          path="/login"
          element={<LoginRegistrationForm currentTab="login" />}
        />
        <Route
          path="/signup"
          element={<LoginRegistrationForm currentTab="signup" />}
        />
      </Routes>

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
