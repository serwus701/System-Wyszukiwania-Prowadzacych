import React, { useState } from "react";

import "./InformationList.css";

function InformationList(props) {
  const [lecturerInformation, setLecturerInformation] = useState(null);

  async function fetchLecturerInformation() {
    const lecturerId = props.lecturerData ? props.lecturerData.id : null;

    if (!lecturerId) return;

    const bannerResponse = await fetch(
      "http://127.0.0.1:8000/api/consultations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lecturer_id: lecturerId }),
      }
    );
    const bannerData = await bannerResponse.json();

    const lecturerBanner =
      bannerData && bannerData.length > 0 ? bannerData.body.banner : null;

    const titleResponse = await fetch("http://127.0.0.1:8000/api/title", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: lecturerId }),
    });
    const titleData = await titleResponse.json();

    const lecturerTitle = titleData ? titleData.titles.before : null;

    setLecturerInformation({
      banner: lecturerBanner,
      title: lecturerTitle ? lecturerTitle : "Prowadzący: ",
    });
  }

  useState(() => {
    fetchLecturerInformation();
  }, [props.lecturerData]);

  return (
    <div className="information-list">
      {props.chosenCourseInfo ? (
        <div>
          <div>{props.chosenCourseInfo.course.time}</div>
          <div>{props.chosenCourseInfo.course.name}</div>
          <div>{props.chosenCourseInfo.course.location}</div>
        </div>
      ) : null}

      {lecturerInformation ? (
        <div>{lecturerInformation.title + " " + props.lecturerData.name}</div>
      ) : null}
      {lecturerInformation ? (
        <div>
          {"Ogłoszenia: " + lecturerInformation.banner === null
            ? lecturerInformation.banner
            : "Brak ogłoszeń"}
        </div>
      ) : null}
      {props.calendarContentType === "C" ? (
        <aside className="dupa">
          <h1>
            {
              JSON.parse(sessionStorage.getItem("classroom")).classroom
                .building_id
            }
            <br />
            {" Sala: " +
              JSON.parse(sessionStorage.getItem("classroom")).classroom.number}
          </h1>
        </aside>
      ) : null}
    </div>
  );
}

export default InformationList;
