import React, { useContext, useState } from "react";
import InformationList from "../../components/InformationList.jsx";
import Calendar from "../../components/Calendar/Calendar.jsx";

import "./ClassResult.css";

const ClassResult = () => {
  const [currCourses, setCurrCourses] = useState([]);
  const [chosenCourse, setChosenCourse] = useState(null);
  const [dayStart, setDayStart] = useState(() => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${year}-${month}-${day}`;
  });

  const dayOfTheWeek = {
    1: "Poniedziałek",
    2: "Wtorek",
    3: "Środa",
    4: "Czwartek",
    5: "Piątek",
  };

  const fetchClassCourses = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/classroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id: JSON.parse(sessionStorage.getItem("classroom")).classroom.id,
        start: dayStart,
      }),
    });
    const data = await response.json();

    setCurrCourses(data);
  };

  useState(() => {
    fetchClassCourses();
  }, []);

  function nextWeekHandler() {
    const date = new Date(dayStart);
    date.setDate(date.getDate() + 7);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    setDayStart(`${year}-${month}-${day}`);

    fetchClassCourses();
  }

  function prevWeekHandler() {
    const date = new Date(dayStart);
    date.setDate(date.getDate() - 7);
    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    setDayStart(`${year}-${month}-${day}`);

    fetchClassCourses();
  }

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

  return (
    <div className="result-box">
      <div>
        <InformationList
          chosenCourseInfo={chosenCourse}
          lecturerData={null}
          calendarContentType={"C"}
        />
      </div>
      <div>
        <Calendar
          classCourses={currCourses}
          consultations={null}
          handleCourseClick={handleCourseClick}
          nextWeekHandler={nextWeekHandler}
          prevWeekHandler={prevWeekHandler}
          calendarContentType={"C"}
        />
      </div>
    </div>
  );
};

export default ClassResult;
