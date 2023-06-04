import React from "react";

import "../styles/Reservation.css";

function ConsultationEdit(props) {
    return (
        <div className="reservation-edit">
            <div>
                <div class="main-text">
                    Dodaj Konsultacje
                </div>
                <button class="stupid-button stupid-button-mode">
                    Zdalnie
                </button>
                <button class="stupid-button stupid-button-gray">
                    Stacjonarnie
                </button>
                <div class="input-box">
                    <div>
                        <span>Prowadzący:</span>
                        <input type="text" class="search-bar" />
                    </div>
                    <div>
                        <span>Sala:</span>
                        <input type="text" class="search-bar" />
                    </div>
                    <div>
                        <span>Termin:</span>
                        <input type="text" class="search-bar" />
                    </div>
                    <div>
                        <span>Komentarz:</span>
                        <input type="text" class="search-bar" />
                    </div>
                </div>
            </div>
        </div>
      );
    }

export default ConsultationEdit;
