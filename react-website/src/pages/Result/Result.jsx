import React, { useContext, useState } from 'react';
import { ReferenceDataContext } from '../../ReferenceDataContext';
import InformationList from '../../components/InformationList.jsx';
import Calendar from '../../components/Calendar/Calendar.jsx';


import './Result.css';

const Result = () => {

    // var chosenCourse = null;
    const [chosenCourse, setChosenCourse] = useState(null);

    const { lecturerCourses } = useContext(ReferenceDataContext);

    function handleCourseClick(course) {
        setChosenCourse(course);
        console.log("dypa " + chosenCourse);
    }

    function getListItems() {
        if (chosenCourse) {
            return chosenCourse.map((course) => {
                return {
                    "dane o kursie": {
                        'Godziny zajęć': course.timeDisplay,
                        'Nazwa przedmiotu': course.name,
                        'sala': course.location
                    },
                    "dane o prowadzącym": {
                        "Imię i nazwisko": "course.lecturer",
                        "katedra": "course.department"
                    },
                    "Ogloszenie": {
                        "Ogloszenie": "course.announcement"
                    },
                    "Konsultacje": {
                        "zoom": "course.zoom",
                        "teams": "course.teams",
                        "web": "course.web"
                    }
                }
            })
        }
        else return [];
    }

    // const listItems = () => {
    //     if (chosenCourse) {
    //         return chosenCourse.map((course) => {
    //             return {
    //                 "dane o kursie": {
    //                     'Godziny zajęć': course.timeDisplay,
    //                     'Nazwa przedmiotu': course.name,
    //                     'sala': course.location
    //                 },
    //                 "dane o prowadzącym": {
    //                     "Imię i nazwisko": "course.lecturer",
    //                     "katedra": "course.department"
    //                 },
    //                 "Ogloszenie": {
    //                     "Ogloszenie": "course.announcement"
    //                 },
    //                 "Konsultacje": {
    //                     "zoom": "course.zoom",
    //                     "teams": "course.teams",
    //                     "web": "course.web"
    //                 }
    //             }
    //         })
    //     }
    //     else return [];
    // }

    // const listItems = chosenCourse ? chosenCourse.map((course) => {
    //     return {
    //         "dane o kursie": {
    //             'Godziny zajęć': course.timeDisplay,
    //             'Nazwa przedmiotu': course.name,
    //             'sala': course.location
    //         },
    //         "dane o prowadzącym": {
    //             "Imię i nazwisko": "course.lecturer",
    //             "katedra": "course.department"
    //         },
    //         "Ogloszenie": {
    //             "Ogloszenie": "course.announcement"
    //         },
    //         "Konsultacje": {
    //             "zoom": "course.zoom",
    //             "teams": "course.teams",
    //             "web": "course.web"
    //         }
    //     }
    // }) : [];
    // const listItems = {
    //     "dane o kursie": {
    //         'Godziny zajęć': '8 - 16',
    //         'Nazwa przedmiotu': "Programowanie w języku C",
    //         'sala': 'C-3:229'
    //     },
    //     "dane o prowadzącym": {
    //         "Imię i nazwisko": "Jan Kowalski",
    //         "katedra": "Katedra Informatyki"
    //     },
    //     "Ogloszenie": {
    //         "Ogloszenie": "Treść ogłoszenia",
    //     },
    //     "Konsultacje": {
    //         "zoom": "xxx",
    //         "teams": "xxx",
    //         "web": "xxx"
    //     }
    // };

    return (
        <div className='result-box'>
            <div>
                <InformationList listItems={getListItems} />
            </div>
            <div>
                <Calendar
                    lecturerCourses={lecturerCourses}
                    handleCourseClick={handleCourseClick} />
            </div>
        </div>
    );
};

export default Result;