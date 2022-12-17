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

const onlyLettersSpaces = (str) => {
    return /^[A-Za-z\s]*$/.test(str);
  }

router.post("/create/post",
    body('username'),
    body('location')
        .isLength({ min: 3, max: 30 })
        .isEmpty(),
    body('message')
        .isLength({ min: 6, max: 100 })
        .isEmpty(),
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty() || !onlyLettersSpaces(req.body.username)) {
            return res.status(400).json("Bad Request: Please use valid inputs")
        }
        //   try {

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

router.delete("/remove",
async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error)
    }
    //   try {

    let user = await User.findOne({ _id: req.body.id });
    if(!user){
        return res.status(400).json("User does not exist!")
    }

    try {
        await User.findOneAndUpdate({ _id: req.body.id }, {$pull: {workPosts: req.body.post}})        
        res.status(200).json({ posts: posts });
    } catch (error) {
        res.status(500).json("An error occurred during deletion of post")        
    }

})


module.exports = router;