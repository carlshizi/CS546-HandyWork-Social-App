
import React, {useState, useRef} from "react";
import {useSelector} from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import TextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import axios from "axios";

//Internal Imports 
import "./EditProfile.css";


const EditProfile = ({
    stored,
    image,
    editCompleteCallback 
}) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [name, setName] = useState(stored.name);
    const [handyman, setHandyman] = useState(stored.handyman);
    const [skills, setSkills] = useState(stored.skills);
    const [bio, setBio] = useState(stored.bio);

    const profileform = useRef(); 

    const isProperName = (str) => {
        str = str.trim();
        const regName = /^[a-zA-Z/s]+$/;
        if (!str.match(regName) || str.length === 0)     
        return (
            <div className="regError2" role="alert">Enter name</div>
          );
    }

    const isHandyman = (str) => {
        if(str !== "Yes" && str !== "No") {
            return  (
                <div className="regError2" role="alert">Choose 'Yes' or 'No'</div>
              );
        }
    }
    
    const isProperString = (str) => {
        if (!str || str.trim().length === 0) {
            return (
                <div className="regError2" role="alert">Enter information in provided field</div>
            );
        }
    }

    const handleCancelClicked = () => {
        editCompleteCallback(stored);
        return; 
    }

    const API_URL = "http://localhost:5000/api/profile/";
    const handleSaveClicked = async(event) => {
        event.preventDefault();
        profileform.current.validateAll();

        //additional validation
        const regName = /^[A-Za-z\s]*$/;
        if (!name.match(regName) || name.length === 0) {alert("Enter valid name (alphabet and spaces only)")};
        if (handyman !== "Yes" && handyman !== "No") {alert("Are you a available handyman? Check 'Yes' or 'No'!")}
        if (skills.trim().length === 0) {alert("Enter some skills")};
        if (bio.trim().length === 0) {alert("Provide a bio")};

        const reqToPost = {
            username: currentUser.other.username,
            name: name, 
            handyman: handyman,
            skills: skills,
            bio: bio
        };

        const response = await axios
            .post((API_URL + "edit"), reqToPost)
            .catch((error) => console.log('Error: ', error));
     
        if(response){
            alert("Your profile has been updated.");
            editCompleteCallback(reqToPost); 
        }
          else{
            editCompleteCallback(stored); 
        }

    } 

  return (
    <div className="EditProfile-Page">
        <div className="EditProfile-form">
        <Form ref={profileform}> 

            

            <div className="EditProfile-input-container">
                <label for="name">Name:</label>
                <Input type="text" name="name" value={name} 
                className="EditProfile-name" 
                onChange={e => setName(e.target.value)}
                validation={isProperName}
                />
            </div>

            <div className="EditProfile-input-container">
                <label for="handyman">Available handyman?</label>
                <Select name="handyman" value={handyman}
                 onChange={e => setHandyman(e.target.value)}
                 validation={isHandyman}
                 >
                    <option value="Empty"></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </Select>
            </div>

            <div className="EditProfile-input-container">
                <label for="skills">Skills:</label>
                <TextArea name="skills" value={skills}
                rows="2" cols="45"
                onChange={e => setSkills(e.target.value)}
                validation={isProperString}
                />
                <small className="profile-form-text">List out some skills you have</small>
            </div>

            <div className="EditProfile-input-container">
                <label for="bio">Bio:</label>
                <TextArea name="bio" value={bio}
                rows="5" cols="45" 
                onChange={e => setBio(e.target.value)}
                validation={isProperString}
                />
                <small className="profile-form-text">Tell us about yourself</small>
            </div>

            <div>
                <CheckButton class="EditProfile-btn" 
                    value="saveProfileBtn" 
                    onClick={handleSaveClicked}>
                        Save</CheckButton>
                <CheckButton class="EditProfile-btn" 
                    onClick={handleCancelClicked}>Cancel</CheckButton>
            </div>
        </Form>
        </div>

    </div>

  );
};


export default EditProfile;