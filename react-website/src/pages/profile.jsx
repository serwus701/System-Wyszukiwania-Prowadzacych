import React from 'react';

const Profile = () => {
    return (
        <div>
            <h1>Użytkownik: {JSON.parse(localStorage.getItem("PROFILE")).firstName} {JSON.parse(localStorage.getItem("PROFILE")).lastName}</h1>
            <h1>Adres email: {JSON.parse(localStorage.getItem("PROFILE")).email}</h1>
        </div>
    );
};

export default Profile;