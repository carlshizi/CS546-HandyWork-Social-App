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

    const API_URL = "http://localhost:5000/api/user/";
    const API_URL_POST_PROFILE = "http://localhost:5000/api/profile/edit/";

    const postInitial = async () => {
        
        const initial = { 
            username: currentUser.other.username,
            name: "firstname lastname", 
            handyman: "No", 
            skills:"List out some skills you have", 
            bio:"Tell us about yourself"
        };

        const initialProfile = await axios 
            .post(API_URL_POST_PROFILE,  initial)
            .catch((error) => console.log('Error: ', error));
        
        if(initialProfile) {
            console.log("initial profile completed");
        }
        setProfile(initial);
    }

    useEffect(() => {
    const getUserProfile = async () => {

        const resProfile = await axios
            .get((API_URL + (`${currentUser.other.username}`).toLowerCase()))
            .catch((error) => console.log('Error: ', error));
        if (resProfile.data.profile ) {
            setProfile(resProfile.data.profile);
        } else {
            postInitial();
        }
        if (resProfile.data.image) {
            setImage(resProfile.data.image);
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