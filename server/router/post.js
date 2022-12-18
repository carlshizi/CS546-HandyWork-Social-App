const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const graph = require("../utils/Graph")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require("./verifytoken");
const VerificationToken = require("../models/VerificationToken");
const JWTSEC = "#2@!@$ndja45883 r7##";
const ResetToken = require("../models/ResetToken");
const crypto = require("crypto");
const { Types } = require('mongoose');

const onlyLettersSpaces = (str) => {
    return /^[A-Za-z\s]*$/.test(str);
  }

const isLength = (str, min, max) => {
    if(str.length < min || str.length > max){
        return false
    }
    else{
        return true
    }
}

router.post("/create/post",
    async (req, res) => {
        if(!isLength(req.body.location, 3, 30) || (!req.body.location) || (!onlyLettersSpaces(req.body.location))){
            return res.status(400).json("Invalid request. Please try again. Location can only use letters, must not be empty (or just whitespaces), and must be 3-30 characters.")
        }

        if(!isLength(req.body.message, 6, 50) || (!req.body.message)){
            return res.status(400).json("Invalid request. Please try again. Description must be 6-50 characters and must not be empty (or just whitespaces).")
        }

        let msg = await Post.findOne({ postMessage: req.body.message });
        if (msg) {
            return res.status(400).json("That message already exists");
        };

        let user = await User.findOne({ username: req.body.username});
        if(!user){
            return res.status(400).json("No user with that username exists. This user CANNOT make a handy work post");
        }

        post = await Post.create({
            username: req.body.username,
            location: req.body.location,
            postMessage: req.body.message
        })
        // const accessToken = jwt.sign({
        //     id: user._id,
        //     username: user.username
        // }, JWTSEC);

        // const PIN = Math.floor(1000 + Math.random() * 9000);    
        // const verificationToken = await VerificationToken.create({
        //     user: user._id,
        //     token: PIN
        // });
        // verificationToken.save();
        await post.save();

        await User.findOneAndUpdate({username: req.body.username}, {$addToSet : {workPosts: post}})

        res.status(200).json({ Status: "Successful", msg: "Post created", post: post._id })
    })

router.get("/getAll",
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }
        //   try {

        let posts = await Post.find({});
        // const accessToken = jwt.sign({
        //     id: user._id,
        //     username: user.username
        // }, JWTSEC);

        // const PIN = Math.floor(1000 + Math.random() * 9000);    
        // const verificationToken = await VerificationToken.create({
        //     user: user._id,
        //     token: PIN
        // });
        // verificationToken.save();

        res.status(200).json({ posts: posts });
    })

router.get("/get/:id",
async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error)
    }
    try {
        let user = await User.findOne({ _id: Types.ObjectId(req.params.id) });
        if(!user){
            return res.status(400).json("User does not exist!")
        }
        return res.status(200).json( {user: user} )
    } catch (error) {
        res.status(500).json("An error occurred during retrieval of posts")        
    }
})

router.put("/remove/:id",
async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error)
    }
    //   try {

    let user = await User.findOne({ _id: req.params.id });
    if(!user){
        return res.status(400).json("User does not exist!")
    }

    try {
        let updatedUser = await User.updateOne({_id : Types.ObjectId(req.params.id)}, {'$pull': {'workPosts' : { '_id': Types.ObjectId(req.body.post._id)}}})
        let updatedPosts = await Post.deleteOne({_id: Types.ObjectId(req.body.post._id)})
        let updatedUserResponse = await User.findOne({ _id: req.params.id });       
        res.status(200).json({ updatedUser: updatedUserResponse });
    } catch (error) {
        res.status(500).json("An error occurred during deletion of post")        
    }

})


module.exports = router;