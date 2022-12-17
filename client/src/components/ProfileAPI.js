import { useState } from 'react';
import EditProfile from './EditProfile';
import UserProfile from './Profile';
import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";

function ProfileAPI() {
    const [editMode, setEditMode] = useState(false);
    const [profilepic, setProfilePic] = useState(null);
    const [name, setName] = useState("FirstName LastName");
    const [handyman, setHandyman] = useState("No");
    const [education, setEducation] = useState("None");
    const [work, setWork] = useState("None");
    const [contacts, setContacts] = useState("None");
    const { user: currentUser } = useSelector((state) => state.auth);

    const stored = {profilepic, name, handyman, education, work, contacts};

    if (!currentUser) {
        return <Navigate to="/login" />;
      }

    function handleEditComplete(result) {
        console.log("handleEditComplete", result);
        if (result != null) {
            setProfilePic(result.profilepic);
            setName(result.name);
            setHandyman(result.handyman);
            setEducation(result.education);
            setWork(result.work);
            setContacts(result.contacts);
        }        
        setEditMode(false);
    }

    return (
        <div className="profile-container">
            <div className='profile-container-contents'>
                { editMode ? (
                    <div className='outerbox m10'>
                    <h1>Edit Profile</h1>
                    <EditProfile
                        stored={stored}
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
                            startEditCallback={() => setEditMode(true)}/>
                    </div>
                )
            }
            </div>
        </div>
    );

};
export default ProfileAPI;