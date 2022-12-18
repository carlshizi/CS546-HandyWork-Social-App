import { useState } from 'react';
import EditProfile from './EditProfile';
import UserProfile from './Profile';
import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";

function ProfileAPI() {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("FirstName LastName");
    const [handyman, setHandyman] = useState("No");
    const [skills, setSkills] = useState("None");
    const [bio, setBio] = useState("None");
    const [experience, setExperience] = useState("None");
  
    const stored = {name, handyman, skills, bio, experience};

    const { user: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
        return <Navigate to="/login" />;
      }

    function handleEditComplete(result) {
        console.log("handleEditComplete", result);
        if (result != null) {
            alert("you hace successfully changed your profile");
            setName(result.name);
            setHandyman(result.handyman);
            setSkills(result.skills);
            setBio(result.bio);
            setExperience(result.experience);
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