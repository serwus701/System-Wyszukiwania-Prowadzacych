import React, { createContext, useState, useEffect } from "react";

const ReferenceDataContext = createContext();

const ReferenceDataContextProvider = ({ children }) => {
    const [lecturerCourses, setLecturerCourses] = useState(null);

    const [count, setCount] = useState(0);

    useEffect(() => {
        // Access count value from session storage
        var pageView = sessionStorage.getItem("pageView");
        if (pageView == null) {
            // Initialize page views count
            pageView = 1;
        } else {
            // Increment count
            pageView = Number(pageView) + 1;
        }
        // Update session storage
        sessionStorage.setItem("pageView", pageView);
        setCount(pageView);

        // Access count value from session storage
        var storedLecturerCourses = JSON.parse(sessionStorage.getItem("lecturerCourses"));

        lecturerCourses ?
            sessionStorage.setItem("lecturerCourses", JSON.stringify(lecturerCourses)) :
            setLecturerCourses(storedLecturerCourses)
    }, []);

    return (
        <ReferenceDataContext.Provider value={{ lecturerCourses, setLecturerCourses }}>
            {count}
            {children}
        </ReferenceDataContext.Provider>
    );
};

export { ReferenceDataContext, ReferenceDataContextProvider };