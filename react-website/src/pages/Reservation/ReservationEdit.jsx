import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Reservation.css";

function ReservationEdit(props) {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [title, setTitle] = useState('np. Wykład z Volvo');
    const [day, setDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [lecturer, setLecturer] = useState('np. dr inż. Marek Bawiec');
    const [room_id, setRoom_id] = useState('np. C3:229');
    const [date, setDate] = useState('np. Styczen 1, 2023 01:15-03:15');
    const [newDate, setNewDate] = useState('');
    const [comment, setComment] = useState('np. Zapraszam');
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
            startTime: startTime,
            endTime: endTime,
            room_id: room_id,
            date: date,
            comment: comment
        };

        props(newReservation);
        navigate('/');

        newDate = date.replace("Styczen", "January");
        newDate = date.replace("Luty", "February");
        newDate = date.replace("Marzec", "March");
        newDate = date.replace("Kwiecien", "April");
        newDate = date.replace("Maj", "May");
        newDate = date.replace("Czerwiec", "June");
        newDate = date.replace("Lipiec", "July");
        newDate = date.replace("Sierpien", "August");
        newDate = date.replace("Wrzesien", "September");
        newDate = date.replace("Pazdziernik", "October");
        newDate = date.replace("Listopad", "November");
        newDate = date.replace("Grudzien", "December");

        const data = {
            "lecturer_id": 5,
            "body": {
                "consultations": {
                    "occurrences": [
                        {
                            "id": 1,
                            "dayOfWeek": newDate.getDay(),
                            "frequency": "TN",
                            "startTime": "9:30",
                            "endTime": "11:20",
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
                        <input type="text" class="search-bar" value={title} onChange={(event) => setTitle(event.target.value)} />
                    </div>
                    <div>
                        <span>Prowadzący:</span>
                        <input type="text" class="search-bar" value={lecturer} onChange={(event) => setLecturer(event.target.value)} />
                    </div>
                    <div>
                        <span>Sala:</span>
                        <input type="text" class="search-bar" value={room_id} onChange={(event) => setRoom_id(event.target.value)} />
                    </div>
                    <div>
                        <span>Termin:</span>
                        <input type="text" class="search-bar" value={date} onChange={(event) => setDate(event.target.value)} />
                    </div>
                    <div>
                        <span>Komentarz:</span>
                        <input type="text" class="search-bar" value={comment} onChange={(event) => setComment(event.target.value)} />
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
