import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../pages/Reservation/Reservation.css";

function ConsultationEdit(props) {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [day, setDay] = useState('');
    const [frequency, setFrequency] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [lecturer, setLecturer] = useState('');
    const [room_id, setRoom_id] = useState('');
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        if (!type || !lecturer || !room_id || !date) {
            return;
        }

        const newConsultation = {
            lecturer: lecturer,
            id: id,
            type: type,
            day: day,
            frequency: frequency,
            startTime: startTime,
            endTime: endTime,
            room_id: room_id,
            date: date,
            comment: comment
        };

        props(newConsultation);
        navigate('/');
    };

    return (
        <div className="reservation-edit">
            <div>
                <div class="main-text">
                    Dodaj Konsultacje
                </div>
                <div class="pill-buttons">
                    <button class="stupid-button stupid-button-mode" onClick={() => setType(1)}>
                        Zdalnie
                    </button>
                    <button class="stupid-button stupid-button-gray" onClick={() => setType(0)}>
                        Stacjonarnie
                    </button>
                </div>
                <div class="input-box">
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

export default ConsultationEdit;
