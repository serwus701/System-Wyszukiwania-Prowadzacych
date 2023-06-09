import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getISOWeek, isEven } from 'date-fns';
import { format, parseISO } from 'date-fns';
import "./Reservation.css";

function ReservationEdit(props) {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [day, setDay] = useState('');
    const [endTime, setEndTime] = useState('');
    const [lecturer, setLecturer] = useState('');
    const [room_id, setRoom_id] = useState('');
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');
    const [jsonData, setJsonData] = useState(null);

    

    const handleSubmit = () => {
        if (!title || !lecturer || !room_id || !date) {
            return;
        }

        const newReservation = {
            lecturer: lecturer,
            id: id,
            title: title,
            day: day,
            endTime: endTime,
            room_id: room_id,
            date: date,
            comment: comment
        };

        props(newReservation);
        navigate('/');

        const translateMonth = (month) => {
            const monthTranslations = {
              Styczen: 'January',
              Luty: 'February',
              Marzec: 'March',
              Kwiecien: 'April',
              Maj: 'May',
              Czerwiec: 'June',
              Lipiec: 'July',
              Sierpien: 'August',
              Wrzesien: 'September',
              Pazdziernik: 'October',
              Listopad: 'November',
              Grudzien: 'December',
            };
        
            if (monthTranslations.hasOwnProperty(month)) {
              return monthTranslations[month];
            }
            return month;
        };

        const translatedText = date.replace(/\b(\w+)\b/g, (match) =>
            translateMonth(match)
        );
        setDate(translatedText);

        const parts = translatedText.split("-");
        setEndTime(parts[1]);

        const weekNumber = getISOWeek(date);
        const weekType = isEven(weekNumber) ? 'TP' : 'TN';

        const parsedDate = parseISO(date.toISOString());
        const startTime = format(parsedDate, 'HH:mm');

        const data = {
            "lecturer_id": 5,
            "body": {
                "consultations": {
                    "occurrences": [
                        {
                            "id": 1,
                            "dayOfWeek": date.getDay(),
                            "frequency": weekType,
                            "startTime": startTime,
                            "endTime": endTime,
                            "room_id": room_id
                        }
                    ]
                },
                "banner": "BBBBBBBB"
            }
        }

        const jsonText = JSON.stringify(data, null, 2);
        setJsonData(jsonText);
    };

    return (
        <div className="reservation-edit-bigger">
            <div>
                <div class="main-text">
                    Dodaj Rezerwację
                </div>
                <div class="input-box">
                    <div>
                        <span>Tytuł:</span>
                        <input type="text" class="search-bar" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="np. Wykład z Volvo"/>
                    </div>
                    <div>
                        <span>Prowadzący:</span>
                        <input type="text" class="search-bar" value={lecturer} onChange={(event) => setLecturer(event.target.value)} placeholder="np. dr inż. Imię Nazwisko"/>
                    </div>
                    <div>
                        <span>Sala:</span>
                        <input type="text" class="search-bar" value={room_id} onChange={(event) => setRoom_id(event.target.value)} placeholder="np. C3:229"/>
                    </div>
                    <div>
                        <span>Termin:</span>
                        <input type="text" class="search-bar" value={date} onChange={(event) => setDate(event.target.value)} placeholder="np. Styczen 1, 2023 01:15-03:15"/>
                    </div>
                    <div>
                        <span>Komentarz:</span>
                        <input type="text" class="search-bar" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="np. Zapraszam"/>
                    </div>
                </div>
                <div>
                    <button type="submit" class="button-submit" onClick={handleSubmit}>
                        Potwierdź
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReservationEdit;
