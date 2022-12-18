import axios from "axios"; 

import {
    GET_PROFILE, 
    PROFILE_ERROR,
} from "./types"; 

// function to get current user profile 
export const getMyProfile = () => async dispatch => {
    try {
        const res = await axios.get("/api/profile/me");
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })

    }
}

//Create or update profile 
export const createProfile = (formData, history, edit=false)  => async dispatch =>{
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post("api/profile/create", formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch(err) {
        const errors = err.response.data.errors;
    }
}

