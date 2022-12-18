import React, { useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import UserProfile from './Profile';
import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import axios from "axios";
import { delete_cookie } from 'sfcookies';
import genericprofilepic from "./img/profilepic.jpg";

function ProfileAPI() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [editMode, setEditMode] = useState(false);
    const [stored, setProfile] = useState({}); 
    const [image, setImage] = useState("");

    const API_URL = "http://localhost:5000/api/post/";

    useEffect(() => {
        const getUserProfile = async () => {

        const resProfile = await axios
            .get((API_URL + `get/${currentUser.other._id}`))
            .catch((error) => console.log('Error: ', error));
        if (resProfile.data.user.profile ) {
            setProfile(resProfile.data.user.profile);
        } else {
            const initial = { name: "firstname lastname", 
            handyman: "No", 
            skills:"List out some skills you have", 
            bio:"Tell us about yourself"};
            setProfile(initial);
        }
        if (resProfile.data.user.image) {
            setImage(resProfile.data.user.image);
        } else {
            setImage(genericprofilepic);
        }
        };
        getUserProfile();
    }, []);   



    if (!currentUser) {
        return <Navigate to="/login" />;
    }
    const cookie_key = "navigate";   // clear cookie for navigating to reset page
   delete_cookie(cookie_key);


    function handleEditComplete(result) {
        setProfile(result);  
        setEditMode(false);
    }

    return (
        <div className="profile-container">
            <div className='profile-container-contents'>
                { editMode ? (
                    <div className='outerbox m10'>
                    <h1>Edit Profile</h1>
                    <EditProfile
                        stored = {stored}
                        image = {image}
                        editCompleteCallback={handleEditComplete}    />                       
                    </div>
                )
                : (
                    <div>
                    {
                        <h1>My Profile</h1>
                    }
                        <UserProfile
                            stored={stored}
                            image = {image}
                            startEditCallback={() => setEditMode(true)}/>
                    </div>
                )
            }
            </div>
        </div>
    );

};
export default ProfileAPI;