import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Reservation.css";

function ReservationEdit(props) {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [day, setDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [lecturer, setLecturer] = useState('');
    const [room_id, setRoom_id] = useState('');
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');

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
