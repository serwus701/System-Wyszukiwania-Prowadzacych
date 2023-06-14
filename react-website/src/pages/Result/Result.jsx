import React, { useState, useEffect } from 'react';
import InformationList from '../../components/InformationList.jsx';
import Calendar from '../../components/Calendar/Calendar.jsx';

import './Result.css';

const Result = () => {
    // const [courseData, setCourseData] = useState(null);
    // const [calendarData, setCalendarData] = useState(null);

    // const fetchCourseData = async () => {
    //     const response = await fetch("http://127.0.0.1:8000/api/ttbyname", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     });
    //     const data = await response.json();
    //     setData(data);
    // }

    // useEffect(() => {
    //     dynamicListItems();
    // }, []);

    // const fetchCalendarData = async () => {
    //     const response = await fetch("http://127.0.0.1:8000/api/ttbyname", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     });
    //     const data = await response.json();
    //     setData(data);
    // }

    // useEffect(() => {
    //     dynamicListItems();
    // }, []);

    const listItems = {
        "dane o kursie": {
            'Godziny zajęć': '8 - 16',
            'Nazwa przedmiotu': "Programowanie w języku C",
            'sala': 'C-3:229'
        },
        "dane o prowadzącym": {
            "Imię i nazwisko": "Jan Kowalski",
            "katedra": "Katedra Informatyki"
        },
        "Ogloszenie": {
            "Ogloszenie": "Treść ogłoszenia",
        },
        "Konsultacje": {
            "zoom": "xxx",
            "teams": "xxx",
            "web": "xxx"
        }
    };

    return (
        <div className='result-box'>
            <div>
                <InformationList listItems={listItems} />
            </div>
            <div>
                <Calendar />
            </div>
        </div>
    );
};

export default Result;