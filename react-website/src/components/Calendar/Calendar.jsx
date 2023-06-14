import React, { useState } from "react";
import Board from "./Board";
import "./Calendar.css"

const Calendar = ({ lecturerCourses }) => {

    const today = new Date();
    const [weekStart, setWeekStart] = useState(
        new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - today.getDay() + 1
        ))

    const weekNames = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];

    const hours = [
        "7:00", "8:00", "9:00", "10:00",
        "11:00", "12:00", "13:00", "14:00",
        "15:00", "16:00", "17:00", "18:00",
        "19:00", "20:00", "21:00"
    ];

    const events =
        lecturerCourses ? lecturerCourses.map((course) => {
            const type = course.classtype_name.pl.charAt(0).toUpperCase();

            const name = course.name.pl;

            const strDate = course.start_time.split(' ')[0];
            const date = new Date(strDate);
            const day = date.getDay();

            const strTimeStart = course.start_time.split(' ')[1];
            const timeStart =
                parseInt(strTimeStart.split(':')[0]) + parseInt(strTimeStart.split(':')[1]) / 60;

            const strTimeEnd = course.end_time.split(' ')[1];
            const timeEnd =
                parseInt(strTimeEnd.split(':')[0]) + parseInt(strTimeEnd.split(':')[1]) / 60;

            const timeDisplay = `${timeStart}:00 - ${timeEnd}:00`;

            const location = course.room_number;

            return {
                type,
                name,
                day,
                timeStart,
                timeEnd,
                timeDisplay,
                location
            };
        }) : [];

    return (
        <div className="calendar">
            <div className="navigation-bar">
                <button>
                    <b>{"<"}</b>
                </button>
                <h1>Plan zajęć i konsultacji</h1>
                <button>
                    <b>{">"}</b>
                </button>
            </div>

            <div className="calendar-itself">
                <div className="hours-panel">
                    {hours.map((hour) => (
                        <div>
                            {hour}
                        </div>
                    ))}
                </div>
                <div className="calendar-grid">
                    <div className="calendar-header">
                        {weekNames.map((dayName, key) => (
                            <div>
                                <div>
                                    {dayName}
                                </div>
                                <div>
                                    {
                                        new Date(
                                            weekStart.getFullYear(),
                                            weekStart.getMonth(),
                                            weekStart.getDate() + key
                                        ).toLocaleDateString()
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    <Board events={events} />
                </div>
            </div>
        </div>

    );
};

export default Calendar;