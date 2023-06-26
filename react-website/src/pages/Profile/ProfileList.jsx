import React, { useState, useEffect } from "react";
import $ from "jquery";

import "../../components/InformationList.css";

function ProfileList(props) {
  const [lecturerInformation, setLecturerInformation] = useState(null);
  const [height, setHeight] = useState(0);

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

  useEffect(() => {
    fetchLecturerInformation();
  }, [props.lecturerData]);

  useEffect(() => {
    let totalHeight = 0;
    $(".my-inline-element").each(function () {
      totalHeight += $(this).height() * 1.5;
    });
    setHeight(totalHeight);
  }, [props.chosenCourseInfo]);

  useEffect(() => {
    function handleResize() {
      let totalHeight = 0;
      $(".my-inline-element").each(function () {
        totalHeight += $(this).height() * 1.5;
      });
      setHeight(totalHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="information-list">
      {props.chosenCourseInfo ? (
        <div
          style={{
            height: `${height}px`,
          }}
        >
          <div className="course-info-box">
            <div className="my-inline-element">
              {props.chosenCourseInfo.course.time}
            </div>
          </div>
          <div>
            <div className="my-inline-element">
              {props.chosenCourseInfo.course.name}
            </div>
          </div>
          <div>
            <div className="my-inline-element">
              {props.chosenCourseInfo.course.location}
            </div>
          </div>
        </div>
      ) : null}

      {lecturerInformation ? (
        <div>{lecturerInformation.title + " " + props.lecturerData.name}</div>
      ) : null}
      <button type="submit" class="button-submit" onClick={""}>
        Edytuj
      </button>
      {lecturerInformation ? (
        <div>
          {"Ogłoszenia: " + lecturerInformation.banner === null
            ? lecturerInformation.banner
            : "Brak ogłoszeń"}
        </div>
      ) : null}
      <button type="submit" class="button-submit" onClick={""}>
        Edytuj
      </button>
    </div>
  );
}

export default ProfileList;
