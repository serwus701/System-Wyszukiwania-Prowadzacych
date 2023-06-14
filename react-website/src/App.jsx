import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login';
import Result from './pages/Result/Result.jsx';
import Profile from './pages/Profile';
import Administration from './pages/Administration';
import Reservations from './pages/Reservation/Reservations';
import Consultations from './pages/Consultations';
import Logout from './pages/Logout/Logout';
import Navbar from './components/Navbar/Navbar.jsx'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReferenceDataContextProvider } from './ReferenceDataContext';
const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient} contextSharing={true}>
            <ReferenceDataContextProvider>
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
            </ReferenceDataContextProvider>
        </QueryClientProvider>

    );
}

export default App;