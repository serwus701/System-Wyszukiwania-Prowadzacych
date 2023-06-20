import React, { useContext, useState } from "react";
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
          };
        }
      : [];
    setChosenCourse(mapedCourse);
  }

  return (
    <div className="result-box">
      <div>
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
