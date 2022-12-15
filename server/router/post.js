const router = require("express").Router();
const Post = require("../models/Post");
const graph = require("../utils/Graph")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require("./verifytoken");
const VerificationToken = require("../models/VerificationToken");
const JWTSEC = "#2@!@$ndja45883 r7##";
const ResetToken = require("../models/ResetToken");
const crypto = require("crypto");


router.post("/create/post",
    body('username'),
    body('message'),
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }
        //   try {

        let msg = await Post.findOne({ postMessage: req.body.message });
        if (msg) {
            return res.status(400).json("That message already exists");
        };

        post = await Post.create({
            username: req.body.username,
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


module.exports = router;