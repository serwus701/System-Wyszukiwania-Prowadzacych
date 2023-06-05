import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Login from './pages/login';
import Result from './pages/Result/Result.jsx';
import Profile from './pages/profile';
import Administration from './pages/administration';
import Reservations from './pages/Reservation/Reservations';
import Consultations from './pages/Consultations';
import Logout from './pages/Logout/Logout';
import Navbar from './components/Navbar/Navbar.jsx'

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* TO DO - przejścia pomiedzy routami, żeby ekran nie migał */}
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/result' element={<Result />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/administration' element={<Administration />} />
                <Route path='/reservations' element={<Reservations />} />
                <Route path='/consultations' element={<Consultations />} />
                <Route path='/logout' element={<Logout />} />
            </Routes>
        </Router>
    );
}

export default App;