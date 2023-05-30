import React from 'react';
import '../styles/Home.css';

const Home = () => {
    return (
        <div class="hero-panel">
            <div>
                <img src="../assets/pwrlogo.png" alt="Politechnika Wrocławska" class="pwr-logo" />
            </div>
            <div>
                <button class="stupid-button stupid-button-room">
                    C-3:229
                </button>
                <button class="stupid-button stupid-button-green">
                    ...
                </button>
            </div>
            <div>
                <input type="text" class="search-bar" />
            </div>
            <div class="hint">
                Wpisz nazwisko, nazwiska prowadzących, salę lub kurs, aby wyświetlić plan.
                Wpisz dzień tygodnia lub słowo termin, aby wyszukać wolne sale.
            </div>
        </div>
    );
};

export default Home;