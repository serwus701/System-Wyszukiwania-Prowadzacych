import React, { createContext, useState, useEffect } from "react";

const ReferenceDataContext = createContext();

const ReferenceDataContextProvider = ({ children }) => {
    const [lecturerCourses, setLecturerCourses] = useState(null);


    useEffect(() => {
        var storedLecturerCourses = JSON.parse(sessionStorage.getItem("lecturerCourses"));

        lecturerCourses ?
            sessionStorage.setItem("lecturerCourses", JSON.stringify(lecturerCourses)) :
            setLecturerCourses(storedLecturerCourses)

    }, []);

    return (
        <ReferenceDataContext.Provider value={{ lecturerCourses, setLecturerCourses }}>
            {children}
        </ReferenceDataContext.Provider>
    );
};

export { ReferenceDataContext, ReferenceDataContextProvider };