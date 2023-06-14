import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getISOWeek } from 'date-fns';
import { format, parseISO } from 'date-fns';
import "../pages/Reservation/Reservation.css";

function ConsultationEdit(props) {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [day, setDay] = useState('');
    const [frequency, setFrequency] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [lecturer, setLecturer] = useState('');
    const [room_id, setRoom_id] = useState('');
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');
    const [jsonData, setJsonData] = useState(null);

    const [isTPSelected, setIsTPSelected] = useState(false);
    const [isTNSelected, setIsTNSelected] = useState(false);

    const handleButtonTN = () => {
        setIsTPSelected(false);
        setIsTNSelected(true);
        setFrequency('TN');
    };
  
    const handleButtonTP = () => {
        setIsTPSelected(true);
        setIsTNSelected(false);
        setFrequency('TP');
    };

    const handleButtonBoth = () => {
        setIsTPSelected(true);
        setIsTNSelected(true);
        setFrequency('T');
      };

    const handleSubmit = () => {
        if (!frequency || !lecturer || !room_id || !date) {
            return;
        }

        const newConsultation = {
            lecturer: lecturer,
            id: id,
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

        if (isTPSelected && isTNSelected) {
            setFrequency('T');
        } else if (isTPSelected) {
            setFrequency('TP');
        } else if (isTNSelected) {
            setFrequency('TN');
        }

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
                            "frequency": frequency,
                            "startTime": startTime,
                            "endTime": endTime,
                            "room_id": room_id
                        }
                    ]
                },
                "banner": "cos z tablicy"
            }
        }

        const jsonText = JSON.stringify(data, null, 2);
        setJsonData(jsonText);
    };

    return (
        <div className="reservation-edit">
            <div>
                <div class="main-text">
                    Dodaj Konsultacje
                </div>
                <div class="pill-buttons">
                    <button class={`stupid-button stupid-button-mode ${isTNSelected ? 'selected' : ''}`} onClick={handleButtonTN} style={{ color: isTPSelected ? '#8D9293' : '#036371' }} >
                        TN
                    </button>
                    <button class={`stupid-button stupid-button-mode ${isTPSelected && isTNSelected ? 'selected' : ''}`} onClick={handleButtonBoth} style={{ color: isTNSelected && isTPSelected ? '#036371' : '#8D9293' }}>
                        T
                    </button>
                    <button class={`stupid-button stupid-button-mode ${isTPSelected ? 'selected' : ''}`} onClick={handleButtonTP} style={{ color: isTNSelected ? '#8D9293' : '#036371' }} >
                        TP
                    </button>
                </div>
                <div class="input-box">
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
                        Podgląd
                    </button>
                    <button type="submit" class="button-submit" onClick={handleSubmit}>
                        Potwierdź
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConsultationEdit;
