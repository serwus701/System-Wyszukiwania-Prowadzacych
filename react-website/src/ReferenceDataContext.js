import React, { createContext, useState, useEffect } from "react";

const ReferenceDataContext = createContext();

const ReferenceDataContextProvider = ({ children }) => {
    const [lecturerCourses, setLecturerCourses] = useState(null);
    const [lecturerData, setLecturerData] = useState(null);


    useEffect(() => {
        var storedLecturerCourses = JSON.parse(sessionStorage.getItem("lecturerCourses"));

        lecturerCourses ?
            sessionStorage.setItem("lecturerCourses", JSON.stringify(lecturerCourses)) :
            setLecturerCourses(storedLecturerCourses)

        var storedLecturerData = JSON.parse(sessionStorage.getItem("lecturerData"));
        
        lecturerData ?
         sessionStorage.setItem("lecturerData", JSON.stringify(storedLecturerData)) :
            setLecturerData(storedLecturerData)

    }, []);

    return (
        <ReferenceDataContext.Provider 
        value={{ lecturerCourses, setLecturerCourses, lecturerData, setLecturerData }}>
            {children}
        </ReferenceDataContext.Provider>
    );
};

export { ReferenceDataContext, ReferenceDataContextProvider };