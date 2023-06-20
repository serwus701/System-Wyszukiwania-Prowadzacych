import React from "react";
import InformationList from "../../components/InformationList.jsx";
import Calendar from "../../components/Calendar/Calendar.jsx";
import "./ClassResult.css";

const ClassResult = () => {
  return (
    <div className="result-box">
      <div>
        <InformationList chosenCourseInfo={""} lecturerData={""} />
      </div>
      <div>
        <Calendar lecturerCourses={""} handleCourseClick={""} />
      </div>
    </div>
  );
};

export default ClassResult;
