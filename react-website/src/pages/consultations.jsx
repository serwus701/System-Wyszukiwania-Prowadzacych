import React from 'react';
import ConsultationList from '../components/ConsultationList.jsx';
import ConsultationEdit from '../components/ConsultationEdit.jsx';

import '../pages/Reservation/Reservation.css';
import './Home/Home.css';

const Consultations = () => {
    const listItems = {
        "termin1": {
            'Data': '01.05 | 13:00 - 15:00',
            'Nazwa przedmiotu': "Konsultacje",
            'Sala': 'Zoom',
            'Opis': 'Zapraszam ogolnie to duzy tekst tu ma sie jakis znalezc zawijajacy wiec tak'
        },
        "termin2": {
            'Data': '02.05 | 13:00 - 15:00',
            'Nazwa przedmiotu': "Konsultacje",
            'Sala': 'Zoom',
            'Opis': 'Zapraszam ogolnie to duzy tekst tu ma sie jakis znalezc zawijajacy wiec tak'
        },
        "termin3": {
            'Data': '03.05 | 13:00 - 15:00',
            'Nazwa przedmiotu': "Konsultacje",
            'Sala': 'Zoom',
            'Opis': 'Zapraszam ogolnie to duzy tekst tu ma sie jakis znalezc zawijajacy wiec tak'
        },
        "termin4": {
            'Data': '04.05 | 13:00 - 15:00',
            'Nazwa przedmiotu': "Konsultacje",
            'Sala': 'Zoom',
            'Opis': 'Zapraszam a tu zdalnie'
        },
        "termin5": {
            'Data': '05.05 | 13:00 - 15:00',
            'Nazwa przedmiotu': "Konsultacje",
            'Sala': 'MSTeams',
            'Opis': 'Zapraszam w sumie tu też zdalnie, ale inaczej'
        }
    };

    return (
        <div className='date'>
            <div>
                <ConsultationEdit />
            </div>
            <div>
                <h1 class="black">Terminy:</h1>
                <ConsultationList listItems={listItems} />
            </div>
        </div>
    );
};

export default Consultations;