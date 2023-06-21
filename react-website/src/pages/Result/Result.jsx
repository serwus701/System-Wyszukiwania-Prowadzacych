import React, { useContext, useEffect, useState } from "react";
import { ReferenceDataContext } from "../../ReferenceDataContext";
import InformationList from "../../components/InformationList.jsx";
import Calendar from "../../components/Calendar/Calendar.jsx";

import "./Result.css";

const Result = () => {
  const { lecturerCourses } = useContext(ReferenceDataContext);

  const [chosenCourse, setChosenCourse] = useState(null);
  const lecturerInformation = JSON.parse(
    sessionStorage.getItem("lecturerData")
  );
  const [consuls, setConsuls] = useState();

  const dayOfTheWeek = {
    1: "Poniedziałek",
    2: "Wtorek",
    3: "Środa",
    4: "Czwartek",
    5: "Piątek",
  };

  useEffect(() => {
    fetchLecturerConsultations();
  }, []);

  function handleCourseClick(course) {
    const mapedCourse = course
      ? () => {
          return {
            course: {
              time:
                dayOfTheWeek[course.day] +
                " T" +
                course.courseWeekEventIndicator +
                "   " +
                course.timeDisplay,
              name: course.name,
              location: course.location,
            },
          };
        }
      : [];
    setChosenCourse(mapedCourse);
  }

  async function fetchLecturerConsultations() {
    const lecturerId = lecturerInformation ? lecturerInformation.id : null;
    if (!lecturerId) return;

    const consResponse = await fetch(
      "http://127.0.0.1:8000/api/consultations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lecturer_id: lecturerId }),
      }
    );
    const consultationsData = await consResponse.json();

    if (Array.isArray(consultationsData)) return;

    const lecturerCons = consultationsData
      ? consultationsData.body.consultations.occurrences
      : null;

    setConsuls(lecturerCons);
  }

  return (
    <div className="result-box">
      <div>
        <InformationList
          chosenCourseInfo={chosenCourse}
          lecturerData={lecturerInformation}
          calendarContentType={"L"}
        />
      </div>
      <div>
        <Calendar
          lecturerCourses={lecturerCourses}
          consultations={consuls}
          handleCourseClick={handleCourseClick}
          calendarContentType={"L"}
        />
      </div>
    </div>
  );
};

export default Result;
