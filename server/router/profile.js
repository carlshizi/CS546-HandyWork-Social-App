
const router = require("express").Router();
const Profile = require("../models/Profile");
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const { Types } = require('mongoose');

const isProperName = (str) => {
    str = str.trim();
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!str.match(regName)) {
        throw "invalid name input";
    } 
}
const isHandyman= (str) => {
    str = str.trim();
    if (str !== "Yes" && str !== "No") {
        throw "invalid handyman input: must be 'Yes' or 'No'";
    }
}
const isValidInput = (str) => {
    str = str.trim()
    if (!str || str.length === 0) {
        throw "invalid string input";
    }
}

// @route GET api/profile/me
// @desc 
router.get("/me", async (req,res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error)
    }
    try {
        let user = await User.findOne({ username: req.body.username });
        if(!user){
            return res.status(400).json("User does not exist!")
        }
        let profile = await Profile.findOne({username: user.username});
        return res.status(200).json(profile);
    } catch(err) {
        console.error(err.message); 
        return res.status(500).json("Server Error");
    }
}
)

// @route POST api/profile/edit
// @desc 
router.post ("/edit", 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const user = await User.findOne({ username: req.body.username});
        if(!user){
            return res.status(400).json("No user with that username exists.");
        }

        const {
            username,
            name, 
            handyman, 
            skills, 
            bio
        } = req.body;

        try{
            isProperName(name); 
            isHandyman(handyman);
            isValidInput(skills);
            isValidInput(bio);
        } catch(e) {
            return res.status(400).json({error : e});
        }

        const profileFields = {};
        profileFields.username = username; 
        if (name) profileFields.name = name; 
        if (handyman) profileFields.handyman = handyman;
        if (bio) profileFields.bio = bio; 
        if (skills) profileFields.skills = skills; 

        try {
            let user = await User.findOne({ username: req.body.username});
            if(!user){
                return res.status(400).json("No user with that username exists. This user CANNOT make a handy work post");
            }
            let profile = await Profile.findOne({ username: req.body.username});

            //Existing Profile
            if(profile) {

                profile = await Profile.findOneAndUpdate(
                    {username: username},
                    {$set: profileFields},
                    {new: true}
                );

                await User.findOneAndUpdate(
                    {username: req.body.username}, 
                    {$set: {profile: profile}}
                );

                return res.json(profile);
            }

            //New Profile
            profile = new Profile(profileFields);
            await profile.save(); 
            await User.findOneAndUpdate({username: req.body.username}, {$addToSet: {profile: profile}})
            return res.json(profile);
        } catch(e) {
            console.error(e.message);
            return res.status(500).json("Server Error");
        }
    }
);

// @route GET api/profile
// @desc 
router.get("/", async(req, res) => {
    try {
        const profiles = await Profile.find();
        return res.status(200).json(profiles);
    } catch(e) {
        console.error(e.message);
        return res.status(500).json("Server Error");
    }

});


module.exports = router; 