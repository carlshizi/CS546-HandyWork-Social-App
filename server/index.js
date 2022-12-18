const express = require("express");
const app = express();
const mongoose = require("mongoose")
const userRouter = require("./router/user");
const profileRouter = require("./router/profile");
const postRouter = require("./router/post");
const cors = require("cors");
// dotenv.config();
const bodyParser = require('body-parser')

app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.urlencoded({extended: true}));

// app.use(bodyParser.urlencoded({
//     extended: false
// }))
// app.use(bodyParser.json());


mongoose.set('strictQuery', false);

mongoose.connect("mongodb://localhost:27017/HandiWork").then(()=>
console.log('Database status: \x1b[33m connected\x1b[0m')).catch(()=>{
          console.log("Some error occured")
})

// mongoose.connect(
//     "mongodb://localhost:27017/HandiWork",
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => {
//         console.log("MongoDB connected");
//     }
// );

app.use(cors());
app.use(express.json());
app.use("/api/user" , userRouter);
app.use("/api/profile" , profileRouter);
app.use("/api/post" , postRouter);

app.listen(5000 , ()=>{
    console.log('Server status: \x1b[33m connected\x1b[0m');
    // console.log('Server routes will be running on http://localhost:5000');
})
