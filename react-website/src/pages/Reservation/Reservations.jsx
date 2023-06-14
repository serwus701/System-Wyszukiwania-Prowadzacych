import React from 'react';
import ReservationItem from './ReservationItem.jsx';
import ReservationEdit from './ReservationEdit.jsx';

import './Reservation.css';
import '../Home/Home.css';

const Reservations = () => {
    const listItems = {
        "dane o rezerwacji": {
            'Data': '01.05 | 13:00 - 15:00',
            'Nazwa przedmiotu': "Spotkanie z Bolvo",
            'Sala': 'C-3 : 229',
            'Opis': 'Zapraszam ogolnie to duzy tekst tu ma sie jakis znalezc zawijajacy wiec tak'
        }
    };

    return (
        <div className='date'>
            <div>
                <ReservationEdit />
            </div>
            <div>
                <h1 class="black">Podgląd:</h1>
                <ReservationItem listItems={listItems} />
            </div>
        </div>
    );
};

export default Reservations;