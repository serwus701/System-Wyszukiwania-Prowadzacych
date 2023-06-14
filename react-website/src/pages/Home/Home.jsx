import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import '../../assets/pwrlogo.png';

const Home = () => {
    const navigate = useNavigate();
    const [searchText, setSearchSearch] = useState('');

    const [classesList, setClassesList] = useState([]);
    const [lecturersList, setLecturersList] = useState([]);

    const fetchLecturerCourses = async (lecturerId) => {
        const response = await fetch("http://127.0.0.1:8000/api/ttbyid", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "id": lecturerId })
        });
        const data = await response.json();
        console.log(data);
    }

    function GetClassroms(searchString, searchData) {
        if (searchString === '') return [];
        const classes = searchData.filter(class_ => {
            return (
                class_.number === searchString ||
                class_.building_id.toLowerCase().includes(searchString.toLowerCase())
                // class_.building_name.pl.toLowerCase().includes(searchString.toLowerCase()) ||
                // class_.building_name.en.toLowerCase().includes(searchString.toLowerCase())
            )
        });
        return classes.slice(0, 5);
    }

    function GetLecturers(searchString, searchData) {
        if (searchString === '') return [];
        const lecturer = searchData.filter(lecturer => {
            return (
                lecturer.first_name.toLowerCase().includes(searchString.toLowerCase()) ||
                lecturer.last_name.toLowerCase().includes(searchString.toLowerCase())
            )
        });
        return lecturer.slice(0, 5);
    }

    useEffect(() => {
        axios.get('/cache/lecturers.json')
            .then(response => {
                const dataWithIds = response.data.map((item) => (
                    { ...item }));
                setLecturersList(dataWithIds);
            })
            .catch(error => {
                console.error('Error in fetching:', error);
            });

        axios.get('/cache/classrooms.json')
            .then(response => {
                var classesList = [];

                for (var prop in response.data) {
                    classesList.push(response.data[prop]);
                }
                setClassesList(classesList);

            })
            .catch(error => {
                console.error('Error in fetching:', error);
            });
    }, []);

    const handleNavigate = () => {
        navigate('/result', { searchText: searchText });
    }

    return (
        <div class="hero-panel">
            <div>
                <img src="./resources/logo.png" alt="Politechnika Wrocławska" class="pwr-logo" />
            </div>
            <div>
                <button class="stupid-button stupid-button-room">
                    C-3:229
                </button>
                <button class="stupid-button stupid-button-green">
                    ...
                </button>
            </div>
            <div>
                <input
                    type="text"
                    class="search-bar"
                    onChange={(e) => setSearchSearch(e.target.value)}
                />
                <div>
                    {GetClassroms(searchText, classesList).map((item) => (
                        <button>
                            {item.building_id}
                        </button>
                    ))}
                    {GetLecturers(searchText, lecturersList).map((item) => (
                        <button
                            onClick={() => fetchLecturerCourses(item.id)}
                        >
                            {item.first_name} {item.last_name}
                        </button>
                    ))}
                </div>
                <div >
                    <button
                        className="search-button"
                        onClick={() => handleNavigate}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div class="hint">
                Wpisz nazwisko, nazwiska prowadzących, salę lub kurs, aby wyświetlić plan.
                Wpisz dzień tygodnia lub słowo termin, aby wyszukać wolne sale.
            </div>
        </div>
    );
};

export default Home;