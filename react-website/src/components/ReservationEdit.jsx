import React from "react";

import "../styles/Reservation.css";

function ReservationEdit(props) {
    return (
        <div className="reservation-edit">
            <div>
                <div class="main-text">
                    Dodaj Rezerwację
                </div>
                <div class="input-box">
                    <div>
                        <span>Tytuł:</span>
                        <input type="text" class="search-bar" />
                    </div>
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

export default ReservationEdit;
