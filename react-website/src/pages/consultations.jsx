import React from 'react';
import ConsultationList from '../components/ConsultationList.jsx';
import ConsultationEdit from '../components/ConsultationEdit.jsx';

import '../styles/Reservation.css';
import '../styles/Home.css';
 
const Consultations = () => {
    const listItems = {
    "dane o rezerwacji": {
        'Data': '01.05 | 13:00 - 15:00',
        'Nazwa przedmiotu': "Spotkanie z Bolvo",
        'Sala': 'Zoom',
        'Opis': 'Zapraszam ogolnie to duzy tekst tu ma sie jakis znalezc zawijajacy wiec tak'
    }
};

    return (
        <div className='date'>
            <div>
                <ConsultationEdit/>
            </div>
            <div>
                <h1>Terminy:</h1>
                <ConsultationList listItems={listItems} />
            </div>
        </div>
    );
};
 
export default Consultations;