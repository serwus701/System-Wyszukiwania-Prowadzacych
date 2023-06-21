import React, { useState } from "react";
import Board from "./Board";
import "./Calendar.css";

const Calendar = (props) => {
  const today = new Date();
  const [weekStart, setWeekStart] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    )
  );

  const weekNames = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];

  const hours = [
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  const weekEvenIndicator = () => {
    let year = new Date(weekStart.getFullYear(), 0, 1);
    let days = Math.floor((weekStart - year) / (24 * 60 * 60 * 1000));
    let week = Math.ceil((weekStart.getDay() + 1 + days) / 7);
    return week % 2 === 1 ? "P" : "N";
  };

  function moveNextWeek() {
    setWeekStart(
      new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + 7
      )
    );
  }

  function movePreviousWeek() {
    setWeekStart(
      new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() - 7
      )
    );
  }

  const events =
    props.calendarContentType === "L"
      ? props.lecturerCourses
        ? props.lecturerCourses.map((course) => {
            const type = course.classtype_name.pl.charAt(0).toUpperCase();

            const name = course.name.pl;

            const strDate = course.start_time.split(" ")[0];
            const date = new Date(strDate);
            const day = date.getDay();

            const strTimeStart = course.start_time.split(" ")[1];
            const timeStart =
              parseInt(strTimeStart.split(":")[0]) +
              parseInt(strTimeStart.split(":")[1]) / 60;

            const strTimeEnd = course.end_time.split(" ")[1];
            const timeEnd =
              parseInt(strTimeEnd.split(":")[0]) +
              parseInt(strTimeEnd.split(":")[1]) / 60;

            const dispTimeStart =
              strTimeStart.split(":")[0] + ":" + strTimeStart.split(":")[1];
            const dispTimeEnd =
              strTimeEnd.split(":")[0] + ":" + strTimeEnd.split(":")[1];

            const timeDisplay = `${dispTimeStart} - ${dispTimeEnd}`;

            const location = course.room_number;

            const lecturer = course.lecturer;

            let weekNumber = Math.floor(
              (date - new Date(date.getFullYear(), 0, 1)) /
                (1000 * 60 * 60 * 24 * 7)
            );

            const courseWeekEventIndicator = weekNumber % 2 === 0 ? "N" : "P";

            return {
              type,
              name,
              day,
              timeStart,
              timeEnd,
              timeDisplay,
              location,
              lecturer,
              courseWeekEventIndicator,
            };
          })
        : []
      : props.classCourses
      ? props.classCourses.map((course) => {
          let typeEng = course.name.en.split("-").slice(-1)[0].charAt(1);
          const type = typeEng === "L" ? "W" : typeEng;

          const name = course.name.pl;

          const strDate = course.start_time.split(" ")[0];
          const date = new Date(strDate);
          const day = date.getDay();

          const strTimeStart = course.start_time.split(" ")[1];
          const timeStart =
            parseInt(strTimeStart.split(":")[0]) +
            parseInt(strTimeStart.split(":")[1]) / 60;

          const strTimeEnd = course.end_time.split(" ")[1];
          const timeEnd =
            parseInt(strTimeEnd.split(":")[0]) +
            parseInt(strTimeEnd.split(":")[1]) / 60;

          const dispTimeStart =
            strTimeStart.split(":")[0] + ":" + strTimeStart.split(":")[1];
          const dispTimeEnd =
            strTimeEnd.split(":")[0] + ":" + strTimeEnd.split(":")[1];

          const timeDisplay = `${dispTimeStart} - ${dispTimeEnd}`;

          let classroom = JSON.parse(
            sessionStorage.getItem("classroom")
          ).classroom;

          const location = classroom.building_id + " " + classroom.number;

          let weekNumber = Math.floor(
            (date - new Date(date.getFullYear(), 0, 1)) /
              (1000 * 60 * 60 * 24 * 7)
          );

          const courseWeekEventIndicator = weekNumber % 2 === 0 ? "N" : "P";

          return {
            type,
            name,
            day,
            timeStart,
            timeEnd,
            timeDisplay,
            location,
            courseWeekEventIndicator,
          };
        })
      : [];

  return (
    <div className="calendar">
      <div className="navigation-bar">
        <button onClick={movePreviousWeek}>
          <b>{"<"}</b>
        </button>
        <h1>Plan zajęć i konsultacji</h1>
        <button onClick={moveNextWeek}>
          <b>{">"}</b>
        </button>
      </div>

      <div className="calendar-itself">
        <div className="hours-panel">
          {hours.map((hour, key) => (
            <div key={key}>{hour}</div>
          ))}
        </div>
        <div className="calendar-grid">
          <div className="calendar-header">
            {weekNames.map((dayName, key) => (
              <div key={key}>
                <div>{dayName}</div>
                <div>
                  {new Date(
                    weekStart.getFullYear(),
                    weekStart.getMonth(),
                    weekStart.getDate() + key
                  ).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
          <Board
            events={events}
            weekEvenIndicator={weekEvenIndicator}
            handleCourseClick={props.handleCourseClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
