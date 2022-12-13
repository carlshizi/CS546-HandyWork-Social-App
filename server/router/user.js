const router = require("express").Router();
const User = require("../models/User");
const graph = require("../utils/Graph")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require("./verifytoken");
// const Post = require("../models/Post");
const VerificationToken = require("../models/VerificationToken");
const JWTSEC = "#2@!@$ndja45883 r7##";
const ResetToken = require("../models/ResetToken");
const crypto = require("crypto");


router.post("/create/user",
    body('username')
        .isLength({ min: 3 })
        .toLowerCase()
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces allowed in username'),
    body('email').isEmail().toLowerCase(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }
        //   try {

        let user = await User.findOne({ username: req.body.username });
        let userEmail = await User.findOne({ email: req.body.email });
        if (user || userEmail) {
            return res.status(400).json("User already exists");
        };
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            profile: req.body.profile,
        })
        const accessToken = jwt.sign({
            id: user._id,
            username: user.username
        }, JWTSEC);

        const PIN = Math.floor(1000 + Math.random() * 9000);    // generate random 4 digit number
        const verificationToken = await VerificationToken.create({
            user: user._id,
            token: PIN
        });
        verificationToken.save();
        await user.save();

        res.status(200).json({ Status: "Successful", msg: "Account created", user: user._id })
    })


//Login
router.post("/login",
    body('email').isEmail().toLowerCase(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        const error = validationResult(req);  // NO
        if (!error.isEmpty()) {
            return res.status(400).json("some error occured")
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json("User not found")
            }

            const Comparepassword = await bcrypt.compare(req.body.password, user.password);
            if (!Comparepassword) {
                return res.status(400).json("Incorrect login credentials")
            }
            const accessToken = jwt.sign({
                id: user._id,
                username: user.username
            }, JWTSEC);
            const { password, ...other } = user._doc
            res.status(200).json({ other, accessToken });

        } catch (error) {
            res.status(500).json("Internal error occured")
        }
    })


//Forgot password
router.post("/forgot/password", async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json("User not found");
    }
    const token = await ResetToken.findOne({ user: user._id });
    if (token) {
        return res.status(400).json("After some time you can request for another token");
    }

    const randomText = crypto.randomBytes(20).toString('hex');
    const resetToken = new ResetToken({
        user: user._id,
        token: randomText
    });
    await resetToken.save();

    return res.status(200).json(`http://localhost:3000/reset/password?token=${randomText}&_id=${user._id}`)
    // return res.status(200).json(`http://localhost:5000/api/user/reset/password?token=${randomText}&_id=${user._id}`)
})


//reset password
router.put("/reset/password", async (req, res) => {
    const { token, _id } = req.query;
    if (!token || !_id) {
        return res.status(400).json("Invalid req");
    }
    const user = await User.findOne({ _id: _id });
    if (!user) {
        return res.status(400).json("user not found")
    }
    const resetToken = await ResetToken.findOne({ user: user._id });
    if (!resetToken) {
        return res.status(400).json("Reset token is not found")
    }

    const isMatch = await bcrypt.compareSync(token, resetToken.token);
    if (!isMatch) {
        return res.status(400).json("Token is not valid");
    }

    const { password } = req.body;
    // const salt = await bcrypt.getSalt(10);
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    await user.save();

    return res.status(200).json("Password successfully reset")
})

// Send Friend Request
// put
// send to other user's receivedRequest
router.put("/sendRequest/:id", async (req, res) => {         // verifyToken
    if (req.params.id !== req.body.user) {
        const user = await User.findById(req.params.id);
        const otheruser = await User.findById(req.body.user);

        if (!user.Friends.includes(req.body.user)) {
            await user.updateOne({ $push: { sentRequests: req.body.user } });
            await otheruser.updateOne({ $push: { receivedRequests: req.params.id } });
            return res.status(200).json("Friend request sent!");
        }
        else if (user.sentRequests.includes(req.params.id) || otheruser.receivedRequests.includes(req.body.user)) {
            return res.status(200).json("A friend request has already been sent or recieved");
        }
        else {
            return res.status(200).json("Already friends!");
        }
    } else {
        return res.status(400).json("Forbidden: You cannot follow yourself")
    }
})


// Accept Friend Request
// put
//send

// Decline Friend Request


// Sent Requests


// Friends' List


// Add-Follow Friend
router.put("/follow/:id", verifyToken, async (req, res) => {
    if (req.params.id !== req.body.user) {
        const user = await User.findById(req.params.id);
        const otheruser = await User.findById(req.body.user);

        if (!user.Followers.includes(req.body.user)) {
            await user.updateOne({ $push: { Followers: req.body.user } });
            await otheruser.updateOne({ $push: { Following: req.params.id } });
            return res.status(200).json("The user has followed you");
        } else {
            await user.updateOne({ $pull: { Followers: req.body.user } });
            await otheruser.updateOne({ $pull: { Following: req.params.id } });
            return res.status(200).json("The user has unfollowed you");
        }
    } else {
        return res.status(400).json("Forbidden: You cannot follow yourself")
    }
})


//Fetch post from Buddies
router.get("/following/:id", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const followersPost = await Promise.all(
            user.Following.map((item) => {
                return Post.find({ user: item })
            })
        )
        const userPost = await Post.find({ user: user._id });

        res.status(200).json(userPost.concat(...followersPost));
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
})


// Update User Profile
router.put("/update/:id", verifyToken, async (req, res) => {
    try {
        if (req.params.id === req.user.id) {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                req.body.password = hash;
                const updateuser = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                });
                await updateuser.save();
                res.status(200).json(updateuser);
            }
        } else {
            return res.status(400).json("Forbidden Access")
        }
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
})


// //get user details for post
// router.get("/post/user/details/:id", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(400).json("User not found")
//         }
//         const { email, password, phonenumber, ...others } = user._doc;
//         res.status(200).json(others);
//     } catch (error) {
//         return res.status(500).json("Internal server error")
//     }
// })


// Friends Suggestion
router.get("/all/user/:id", async (req, res) => {
    try {
        const allUser = await User.find();
        const user = await User.findById(req.params.id);

        //
        const followinguser = await Promise.all(
            user.Following.map((item) => {
                return item;
            })
        )

        let UserToFollow = allUser.filter((val) => {
            return !followinguser.find((item) => {
                return val._id.toString() === item;
            })
        })

        let filteruser = await Promise.all(
            UserToFollow.map((item) => {
                const { email, phonenumber, Followers, Following, password, ...others } = item._doc;
                return others
            })
        )

        res.status(200).json(filteruser)
    } catch (error) {
        // res.status(400).json(error)
    }

})


// Get friends of friends of friends list (Graph Traversal)
router.get("/fof/user/:id", async (req, res) => {         // verifyToken
    const allUser = await User.find();
    if (allUser.length === 0) {
        return res.status(400).json("Server has no users")
    }

    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(400).json("Invalid user")
    }

    const email = user.email;

    try {
        /**
         * Friends of Friends Graph Traversal
         * creates an array of emails of friends
         */
        const fof = await graph.BFS(email);     // array returned
        let fof_list = []
        for (let i = 0; i < fof.length; ++i) {
            fof_list.push(await User.find({ email: fof[i] }))
        }

        res.status(200).json(fof_list)
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router;