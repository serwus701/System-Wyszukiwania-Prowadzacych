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
      title: lecturerTitle,
    });
  }

  useState(() => {
    fetchLecturerInformation();
  }, [props.lecturerData]);

  if (!lecturerInformation) return null;

  return (
    <div className="information-list">
      {props.chosenCourseInfo ? (
        <div>
          <div>{props.chosenCourseInfo.course.time}</div>
          <div>{props.chosenCourseInfo.course.name}</div>
          <div>{props.chosenCourseInfo.course.location}</div>
        </div>
      ) : null}
      <div>{lecturerInformation.title + " " + props.lecturerData.name}</div>
      <div>
        {"Ogłoszenia: " + lecturerInformation.banner === null
          ? lecturerInformation.banner
          : "Brak ogłoszeń"}
      </div>
    </div>
  );
}

export default InformationList;
