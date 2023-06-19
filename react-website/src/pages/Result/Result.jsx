import React, { useContext, useState } from "react";
import { ReferenceDataContext } from "../../ReferenceDataContext";
import InformationList from "../../components/InformationList.jsx";
import Calendar from "../../components/Calendar/Calendar.jsx";

import "./Result.css";

const Result = () => {
  const [chosenCourse, setChosenCourse] = useState(null);

  const { lecturerCourses } = useContext(ReferenceDataContext);

  const getLecturerInformation = async (lecturerId) => {
    const response = await fetch("http://127.0.0.1:8000/api/ttbyid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lecturer_id: lecturerId }),
    });
    const data = await response.json();
  };

  function handleCourseClick(course) {
    console.log(course);
    const mapedCourse = course
      ? () => {
          return {
            "dane o kursie": {
              "Godziny zajęć": course.timeDisplay,
              "Nazwa przedmiotu": course.name,
              sala: course.location,
            },
            "dane o prowadzącym": {
              "Imię i nazwisko": course.lecturer,
              katedra: "course.department",
            },
            Ogloszenie: {
              Ogloszenie: "course.announcement",
            },
            Konsultacje: {
              zoom: "course.zoom",
              teams: "course.teams",
              web: "course.web",
            },
          };
        }
      : [];
    setChosenCourse(mapedCourse);
  }

  return (
    <div className="result-box">
      <div>
        <InformationList listItems={chosenCourse} />
      </div>
      <div>
        <Calendar
          lecturerCourses={lecturerCourses}
          handleCourseClick={handleCourseClick}
        />
      </div>
    </div>
  );
};

export default Result;
