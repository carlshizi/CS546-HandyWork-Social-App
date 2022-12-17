
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
    const [profilepic, setProfilePic] = useState(stored.profilepic);
    const [name, setName] = useState(stored.name);
    const [handyman, setHandyman] = useState(stored.handyman);
    const [education, setEducation] = useState(stored.education);
    const [work, setWork] = useState(stored.work);
    const [contacts, setContacts] = useState(stored.contacts);
    
    const profileform = useRef(); 
    const uploadedImg =useRef();


    const isProperName = (str) => {
        str = str.trim();
        const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        if (!str.match(regName))     
        return (
            <div className="regError2" role="alert">Enter firstname lastname</div>
          );
    }

    
  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const {current} = uploadedImg;
      current.file = file;
      reader.onload = (e) => {
          current.src = e.target.result;
      }
      reader.readAsDataURL(file);
      setProfilePic(current.src); 
    }
  };

    const handleCancelClicked = () => {
        editCompleteCallback(null);
    }

    const handleSaveClicked = (e) => {
        e.preventDefault();
        profileform.current.validateAll();
        editCompleteCallback({name, handyman, education, work, contacts});
    }
 
  return (
    <div className="EditProfile-Page">
        <div className="EditProfile-form">
        <Form ref={profileform}>
            <div className="profilepic-container">
                <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={e=> handleImageUpload(e.target.value)} />
                <img src={profilepic} class="profilepic"  width="170" height="170" alt= "Profile Pic"/>
            </div>

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
                <label for="education">Education</label>
                <TextArea name="education" value={education}
                rows="2" cols="50"
                onChange={e => setEducation(e.target.value)}/>
            </div>

            <div className="EditProfile-input-container">
                <label for="work">Work Background</label>
                <TextArea name="work" value={work}
                rows="5" cols="50" 
                onChange={e => setWork(e.target.value)}/>
            </div>

            <div className="EditProfile-input-container">
                <label for="contacts">Contact me</label>
                <TextArea name="contacts" value={contacts}
                rows="2" cols="50" 
                onChange={e => setContacts(e.target.value)}/>
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