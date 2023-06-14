import React, { createContext, useState } from "react";

const ReferenceDataContext = createContext();

const ReferenceDataContextProvider = ({ children }) => {
    const [lecturerCourses, setLecturerCourses] = useState(null);

    return (
        <ReferenceDataContext.Provider value={{ lecturerCourses, setLecturerCourses }}>
            {children}
        </ReferenceDataContext.Provider>
    );
};

export { ReferenceDataContext, ReferenceDataContextProvider };