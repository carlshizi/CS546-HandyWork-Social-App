
const router = require("express").Router();
const Profile = require("../models/Profile");
const User = require("../models/User");
const { body, validationResult } = require('express-validator');


// @route GET api/profile/me
// @desc 

router.get("/me", async (req,res) => {
    try {
        const profile = await Profile.findOne({username: req.body.username});
    } catch(err) {
        console.error(err.message); 
        res.status(500).send("Server Error");
    }
}
)

// @route POST api/create/profile
// @desc 
router.post ("/", 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        let user = await User.findOne({ username: req.body.username});
        if(!user){
            return res.status(400).json("No user with that username exists.");
        }

        const {
            username,
            name, 
            handyman, 
            skills, 
            bio,
            experience
        } = req.body;

        // validation needed
        const isProperName = (str) => {
            str = str.trim();
            const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
            if (!str.match(regName)) return res.status(400).json("invalid name input");
        }
        isProperName(name); 


        const profileFields = {};
        profileFields.username = username; 
        if (name) profileFields.name = name; 
        if (handyman) profileFields.handyman = handyman;
        if (bio) profileFields.bio = bio; 
        if (experience) profileFields.experience = experience; 
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

                return res.json(profile);
            }

            //New Profile
            profile = new Profile(profileFields);
            await profile.save(); 
            await User.findOneAndUpdate({username: req.body.username}, {$set : {profile: profile}})
            return res.json(profile);
        } catch(e) {
            console.error(e.message);
            return res.status(500).send("Server Error");
        }
    }
);

router.get("/", async(req, res) => {
    try {

        const profiles = await Profile.find();
        res.status(200).json(profiles);

    } catch(e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }

});




module.exports = router; 