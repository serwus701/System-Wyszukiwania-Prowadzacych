import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Result from "./pages/Result/Result.jsx";
import Profile from "./pages/Profile";
import Administration from "./pages/Administration";
import Reservations from "./pages/Reservation/Reservations";
import Consultations from "./pages/Consultations";
import Navbar from "./components/Navbar/Navbar.jsx";
import { ReferenceDataContextProvider } from "./ReferenceDataContext";
import ClassResult from "./pages/Result/ClassResult";

function App() {
  return (
      <ReferenceDataContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/result" element={<Result />} />
            <Route path="/classResult" element={<ClassResult />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/consultations" element={<Consultations />} />
          </Routes>
        </Router>
      </ReferenceDataContextProvider>
  );
}

export default App;
