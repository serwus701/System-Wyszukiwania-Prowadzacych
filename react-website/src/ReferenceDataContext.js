import React, { createContext, useState, useEffect } from "react";

const ReferenceDataContext = createContext();

const ReferenceDataContextProvider = ({ children }) => {
    const [lecturerCourses, setLecturerCourses] = useState(null);
    const [lecturerData, setLecturerData] = useState(null);

    const [classId, setClassId] = useState(null);


    useEffect(() => {
        var storedLecturerCourses = JSON.parse(sessionStorage.getItem("lecturerCourses"));

        lecturerCourses ?
            sessionStorage.setItem("lecturerCourses", JSON.stringify(lecturerCourses)) :
            setLecturerCourses(storedLecturerCourses)

        var storedLecturerData = JSON.parse(sessionStorage.getItem("lecturerData"));
        
        lecturerData ?
            sessionStorage.setItem("lecturerData", JSON.stringify(storedLecturerData)) :
            setLecturerData(storedLecturerData)

        var classroomId = JSON.parse(sessionStorage.getItem("classroomId"));
        classId ?
            sessionStorage.setItem("classroomId", JSON.stringify(classroomId)) :
            setClassId(classroomId)

    }, []);

    return (
        <ReferenceDataContext.Provider 
        value={{ lecturerCourses,
         setLecturerCourses,
          lecturerData,
           setLecturerData,
            classId,
             setClassId }}>
            {children}
        </ReferenceDataContext.Provider>
    );
};

export { ReferenceDataContext, ReferenceDataContextProvider };