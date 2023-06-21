import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../pages/Reservation/Reservation.css";

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
    const [building_id, setBuilding_id] = useState('');
    const [number, setNumberd] = useState('');
    const [oldData, setOldData] = useState(null);
    const [jsonData, setJsonData] = useState(null);

    const [isTPSelected, setIsTPSelected] = useState(false);
    const [isTNSelected, setIsTNSelected] = useState(false);

    const [lecturersData, setLecturersData] = useState(null);
    const [roomData, setRoomData] = useState(null);


    const [name, setName] = useState('Jaros\u0142aw');
    const [surname, setSurname] = useState('Krawczyszyn');

    const [putResponse, setPutResponse] = useState(null);
    const [newData , setNewData] = useState(null);
    const [finalData , setFinalData] = useState(null);
    const [lecturerBody , setLecturerBody] = useState(null);
    const [troomId , setTroomId] = useState(null);


    const searchPerson = (firstName, lastName) => {
        const foundPerson = lecturersData.find(person =>
            person.first_name === firstName && person.last_name === lastName
        );

        if (foundPerson) {
            console.log('Person found:', foundPerson);
            setId(foundPerson.id);
        } else {
            console.log('Nie znaleziono osoby o podanym imieniu i nazwisku.');
        }
    };

    useEffect(() => {
        axios.get('/cache/lecturers.json')
            .then(response => {
                setLecturersData(response.data);
            })
            .catch(error => {
                console.error('Error in fetching:', error);
            });
    }, []);

    const searchRoomID = (building_id, number) => {
        const foundRoomID = Object.values(roomData).find(room =>
          room.building_id === building_id && room.number === number
        );
      
        if (foundRoomID) {
          console.log('Room found:', foundRoomID);
          setTroomId(foundRoomID.id);
          console.log(troomId);
        } else {
          console.log('Nie znaleziono sali o podanym identyfikatorze.');
        }
      };

    useEffect(() => {
        axios
          .get('/cache/classrooms.json')
          .then(response => {
            setRoomData(response.data);
          })
          .catch(error => {
            console.error('Error in fetching:', error);
          });
      }, []);

    const fetchConsultationsData = async (id) => {
        console.log(id);
        const response = await fetch("http://127.0.0.1:8000/api/consultations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
                "lecturer_id" : id
            }
          ),
        });
        const fetchInfo = await response.json();
        if (fetchInfo && fetchInfo.body) {
            console.log('Data:', fetchInfo.body);
          }
        return fetchInfo;
    }

    const putConsultations = async (someData) => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/consultations', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(someData),
          });
    
          if (response.ok) {
            console.log('Everything ok');
            const responseData = await response.json();
            setPutResponse(responseData);
          } else {
            console.log('Error sending PUT request');
          }
        } catch (error) {
          console.log('Network error:', error);
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
        props.onListItemsUpdate(preview);
    };

    const handleSubmit = () => {
        
        setLecturer(searchPerson(name, surname));
        
        const tempRoom = room_id.split(":");
        setTroomId(searchRoomID(tempRoom[0], tempRoom[1]));
        
        console.log(id);
        console.log(lecturer);
        console.log(room_id);
        console.log(troomId);
        console.log('before fetch');
        fetchConsultationsData(id).then((data) => {
            setOldData(data);
        });
        console.log('fetched');

        const occurrences = oldData && oldData.body && oldData.body.consultations ? oldData.body.consultations.occurrences : [];
        const maxId = Math.max(...occurrences.map(occurrence => occurrence.id));

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

        console.log('parity checked');
        const conId = maxId + 1;

        const tempFinalinalData = {
            "lecturer_id": oldData.lecturer_id,
          "body": {
            "consultations": {
              "occurrences": [
                {
                  "id": conId,
                  "dayOfWeek": day,
                  "frequency": frequency,
                  "startTime": startTime,
                  "endTime": endTime,
                  "room_id": troomId
                }
              ]
            }
            }
        }
        
        console.log('generated tempFinalData');
        console.log(frequency);
        console.log(id);
        console.log(troomId);
        console.log(room_id);
        console.log(day);
        if (!frequency || !id || !troomId || !day) {
            return;
        }

        console.log('if passed');
        setFinalData(tempFinalinalData);

        const jsonText = JSON.stringify(finalData, null, 2);
        setJsonData(jsonText);

        putConsultations(jsonData);
        console.log('put done');
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
                        <span>Sala:</span>
                        <input type="text" class="search-bar" value={room_id} onChange={(event) => setRoom_id(event.target.value)} placeholder="np. C-3:229" />
                    </div>
                    <div>
                        <span>Dzień:</span>
                        <input type="text" class="search-bar" value={day} onChange={(event) => setDay(event.target.value)} placeholder="np. Środa" />
                    </div>
                    <div>
                        <span>Godzina:</span>
                        <input type="text" class="search-bar" value={startTime} onChange={(event) => setStartTime(event.target.value)} placeholder="np. 09:15-11:15" />
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
