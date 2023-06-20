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

  function handleCourseClick(course) {
    const mapedCourse = course
      ? () => {
          return {
            course: {
              time: course.timeDisplay,
              name: course.name,
              location: course.location,
            },
            lecturer: {
              name: course.lecturer,
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
        {console.log(chosenCourse)}
        <InformationList
          chosenCourseInfo={chosenCourse}
          lecturerData={lecturerInformation}
        />
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
