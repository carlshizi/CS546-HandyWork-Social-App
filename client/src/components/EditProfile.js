
import React, {useState, useRef} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import TextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";


//Internal Imports 
import "./EditProfile.css";


const EditProfile = ({
    stored,
    editCompleteCallback 
}) => {
    const [name, setName] = useState(stored.name);
    const [handyman, setHandyman] = useState(stored.handyman);
    const [skills, setSkills] = useState(stored.skills);
    const [bio, setBio] = useState(stored.bio);
    const [experience, setExperience] = useState(stored.experience);

    const profileform = useRef(); 

    const isProperName = (str) => {
        str = str.trim();
        const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        if (!str.match(regName))     
        return (
            <div className="regError2" role="alert">Enter firstname lastname</div>
          );
    }

    const handleCancelClicked = () => {
        editCompleteCallback(null);

        return; 
    }

    const handleSaveClicked = (e) => {
        e.preventDefault();
        profileform.current.validateAll();
        editCompleteCallback({name, handyman, skills, bio, experience});
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
                validations={[isProperName]}/>
            </div>

            <div className="EditProfile-input-container">
                <label for="availableHandyman">Available handyman?</label>
                <Select name="availableHandyman" value={handyman}
                onChange={e => setHandyman(e.target.value)}>
                    <option value="Yes">Yes</option>
                    <option value="No" checked>No</option>
                </Select>
            </div>

            <div className="EditProfile-input-container">
                <label for="skills">Skills</label>
                <TextArea name="skills" value={skills}
                rows="2" cols="50"
                onChange={e => setSkills(e.target.value)}/>
                <small className="profile-form-text">List out some skills you have</small>
            </div>

            <div className="EditProfile-input-container">
                <label for="bio">Bio</label>
                <TextArea name="bio" value={bio}
                rows="5" cols="50" 
                onChange={e => setBio(e.target.value)}/>
                <small className="profile-form-text">Tell us about yourself</small>
            </div>

            <div className="EditProfile-input-container">
                <label for="experience">Experience</label>
                <TextArea name="experience" value={experience}
                rows="5" cols="50" 
                onChange={e => setExperience(e.target.value)}/>
                <small className="profile-form-text">List out some of your work experiences</small>
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