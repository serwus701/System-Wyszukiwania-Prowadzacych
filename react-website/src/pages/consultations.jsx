import React, { useState } from 'react';
import ConsultationList from '../components/ConsultationList.jsx';
import ConsultationEdit from '../components/ConsultationEdit.jsx';

import '../pages/Reservation/Reservation.css';
import './Home/Home.css';

const Consultations = () => {
    const [listItems, setListItems] = useState({
        "termin1": {
            'Data': '- | -',
            'Nazwa przedmiotu': "Konsultacje",
            'Sala': '-'
        }
    });

    const handleListItemsUpdate = (updatedItems) => {
        setListItems(updatedItems);
    };

    return (
        <div className='date'>
            <div>
                <ConsultationEdit onListItemsUpdate={handleListItemsUpdate} />
            </div>
            <div>
                <h1 class="black">Podgląd:</h1>
                <ConsultationList listItems={listItems} />
            </div>
        </div>
    );
};

export default Consultations;