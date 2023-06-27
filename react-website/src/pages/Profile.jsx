import React, { useContext, useEffect, useState } from "react";
import { ReferenceDataContext } from "../ReferenceDataContext";
import ProfileList from "./Profile/ProfileList.jsx";
import Calendar from "../components/Calendar/Calendar.jsx";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [id, setId] = useState(null);
  const [lecturersData, setLecturersData] = useState(null);

  const searchPerson = () => {
    if (lecturersData) {
      const foundPerson = lecturersData.find(
        (person) => person.first_name === name && person.last_name === surname
      );

      if (foundPerson) {
        console.log("Person found:", foundPerson);
        setId(foundPerson.id);
      } else {
        console.log("Nie znaleziono osoby o podanym imieniu i nazwisku.");
      }
    }
  };

  useEffect(() => {
    setName("Jarosław");
    setSurname("Krawczyszyn");
  }, []);

  useEffect(() => {
    axios
      .get("/cache/lecturers.json")
      .then((response) => {
        setLecturersData(response.data);
      })
      .catch((error) => {
        console.error("Error in fetching:", error);
      });
  }, []);

  useEffect(() => {
    if (lecturersData && name && surname) {
      searchPerson();
    }
  }, [lecturersData, name, surname]);

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
    if (!id) return;

    const consResponse = await fetch(
      "http://127.0.0.1:8000/api/consultations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lecturer_id: id }),
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
    <div>
      <h1>
        Użytkownik: {JSON.parse(localStorage.getItem("PROFILE")).firstName}{" "}
        {JSON.parse(localStorage.getItem("PROFILE")).lastName}
      </h1>
      <h1>Adres email: {JSON.parse(localStorage.getItem("PROFILE")).email}</h1>
    </div>
    // <div className="result-box">
    //   <div>
    //     <ProfileList
    //       chosenCourseInfo={chosenCourse}
    //       lecturerData={lecturerInformation}
    //       calendarContentType={"L"}
    //     />
    //   </div>
    //   <div>
    //     <Calendar
    //       lecturerCourses={lecturerCourses}
    //       consultations={consuls}
    //       handleCourseClick={handleCourseClick}
    //       calendarContentType={"L"}
    //     />
    //   </div>
    // </div>
  );
};

export default Profile;
