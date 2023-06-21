import React, { createContext, useState, useEffect } from "react";

const ReferenceDataContext = createContext();

const ReferenceDataContextProvider = ({ children }) => {
    const [lecturerCourses, setLecturerCourses] = useState(null);
    const [lecturerData, setLecturerData] = useState(null);

    const [classroom, setClassroom] = useState(null);


    useEffect(() => {
        let storedLecturerCourses = JSON.parse(sessionStorage.getItem("lecturerCourses"));

        lecturerCourses ?
            sessionStorage.setItem("lecturerCourses", JSON.stringify(lecturerCourses)) :
            setLecturerCourses(storedLecturerCourses)

            let storedLecturerData = JSON.parse(sessionStorage.getItem("lecturerData"));
        
        lecturerData ?
            sessionStorage.setItem("lecturerData", JSON.stringify(storedLecturerData)) :
            setLecturerData(storedLecturerData)

        let storedClassroom = JSON.parse(sessionStorage.getItem("classroom"));
        classroom ?
            sessionStorage.setItem("classroom", JSON.stringify(storedClassroom)) :
            setClassroom(storedClassroom)


    }, []);

    return (
        <ReferenceDataContext.Provider 
        value={{ lecturerCourses, setLecturerCourses, lecturerData, setLecturerData, classroom, setClassroom }}>
            {children}
        </ReferenceDataContext.Provider>
    );
};

export { ReferenceDataContext, ReferenceDataContextProvider };