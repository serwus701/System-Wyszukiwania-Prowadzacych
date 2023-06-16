import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../pages/Reservation/Reservation.css";
import lecturersData from '../../../public/cache/lecturers.json';

function ConsultationEdit(props) {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [conId, setConId] = useState('');
    const [banner, setBanner] = useState('');
    const [day, setDay] = useState('');
    const [frequency, setFrequency] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [lecturer, setLecturer] = useState('');
    const [room_id, setRoom_id] = useState('');
    const [jsonData, setJsonData] = useState(null);

    const [isTPSelected, setIsTPSelected] = useState(false);
    const [isTNSelected, setIsTNSelected] = useState(false);

    const searchPerson = (firstName, lastName) => {
        const foundPerson = lecturersData.find(person =>
          person.first_name === firstName && person.last_name === lastName
        );
    
        if (foundPerson) {
          console.log('Znaleziono osobę:', foundPerson);
          setId(foundPerson.id);
        } else {
          console.log('Nie znaleziono osoby o podanym imieniu i nazwisku.');
        }
    };
    
    const preview = {
        "termin1": {
            'Data': startTime,
            'Nazwa przedmiotu': "Konsultacje",
            'Sala': room_id
        }
    }

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

    const handlePreviewData = () => {
        props.onPreviewData(preview);
    };

    const handleSubmit = () => {
        if (!frequency || !lecturer || !room_id || !day) {
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
        };

        props(newConsultation);
        navigate('/');

        const translateDay = (dayNum) => {
            const dayTranslations = {
              Poniedziałek: '0',
              Wtorek: '1',
              Środa: '2',
              Czwartek: '3',
              Piątek: '4',
              Sobota: '5',
              Niedziela: '6'
            };
        
            if (dayTranslations.hasOwnProperty(dayNum)) {
              return dayTranslations[dayNum];
            }
            return dayNum;
        };

        const translatedText = day.replace(/\b(\w+)\b/g, (match) =>
            translateDay(match)
        );
        setDay(translatedText);

        const parts = startTime.split("-");
        setStartTime(parts[0]);
        setEndTime(parts[1]);

        if (isTPSelected && isTNSelected) {
            setFrequency('T');
        } else if (isTPSelected) {
            setFrequency('TP');
        } else if (isTNSelected) {
            setFrequency('TN');
        }

        const data = {
            "lecturer_id": id,
            "body": {
                "consultations": {
                    "occurrences": [
                        {
                            "id": conId+1,
                            "dayOfWeek": day,
                            "frequency": frequency,
                            "startTime": startTime,
                            "endTime": endTime,
                            "room_id": room_id
                        }
                    ]
                },
                "banner": banner
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
                    <button class={`stupid-button stupid-button-mode ${isTNSelected ? 'selected' : ''}`} onClick={handleButtonTN} style={{ color: isTNSelected ? '#036371' : '#8D9293' }} >
                        TN
                    </button>
                    <button class={`stupid-button stupid-button-mode ${isTPSelected && isTNSelected ? 'selected' : ''}`} onClick={handleButtonBoth} style={{ color: isTNSelected && isTPSelected ? '#036371' : '#8D9293' }}>
                        T
                    </button>
                    <button class={`stupid-button stupid-button-mode ${isTPSelected ? 'selected' : ''}`} onClick={handleButtonTP} style={{ color: isTPSelected ? '#036371' : '#8D9293' }} >
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
                        <span>Dzień:</span>
                        <input type="text" class="search-bar" value={day} onChange={(event) => setDay(event.target.value)} placeholder="np. Środa"/>
                    </div>
                    <div>
                        <span>Godzina:</span>
                        <input type="text" class="search-bar" value={startTime} onChange={(event) => setStartTime(event.target.value)} placeholder="np. 09:15-11:15"/>
                    </div>
                </div>
                <div>
                    <button type="submit" class="button-submit" onClick={handlePreviewData}>
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
