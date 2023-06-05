import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../Reservation/Reservation.css";
import "./Logout.css";

const Logout = ({ handler }) => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const handleLogin = () => {
        if (!login || !password) {
            return;
        }

        const newLogin = {
            login: login,
            password: password
        };

        handler(newLogin);
        navigate('/');
    };

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <div class="login-main">
            <h1>Zostałeś poprawnie wylogowany</h1>
            <div class="login-again">
                <h1>Zaloguj się ponownie</h1>
                <div class="input-box">
                    <div>
                        <span>Login:</span>
                        <input type="text" class="search-bar" value={login} onChange={(event) => setLogin(event.target.value)} />
                    </div>
                    <div>
                        <span>Hasło:</span>
                        <input type={show ? "text" : "password"} class="search-bar" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div>
                        <label onClick={handleShow}>{show ? "Ukryj Hasło" : "Pokaż Hasło"}</label>
                    </div>
                    <div>
                        <button type="submit" class="button-submit" onClick={handleLogin}>
                            Zaloguj
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Logout;