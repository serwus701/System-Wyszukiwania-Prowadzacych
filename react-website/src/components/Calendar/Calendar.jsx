import React from "react";
import Board from "./Board";
import "./Calendar.css"

const Calendar = () => {

    const weekStart = new Date(2021, 9, 4);
    const weekNames = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];
    const hours = [
        "7:00", "8:00", "9:00", "10:00",
        "11:00", "12:00", "13:00", "14:00",
        "15:00", "16:00", "17:00", "18:00",
        "19:00", "20:00", "21:00"
    ];

    const events = [
        {
            type: "W",
            name: "Konsultacje",
            day: 2,
            timeStart: 8,
            timeEnd: 10,
            timeDisplay: "8:00 - 10:00",
            location: "C-16:L2.1"
        },
        {
            name: "AK2",
            day: 1,
            timeStart: 13,
            timeEnd: 15,
            timeDisplay: "13:00 - 15:00",
            location: "C-16:L2.1"
        }
    ];

    return (
        <div className="calendar">
            <div className="navigation-bar">
                <button>
                    {"<"}
                </button>
                <div>Plan zajęć i konsultacji</div>
                <button>
                    {">"}
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
                        {weekNames.map((dayName) => (
                            <div>
                                <div>
                                    {dayName}
                                </div>
                                <div>
                                    {weekStart.toLocaleDateString()}
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