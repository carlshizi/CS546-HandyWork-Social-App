const mongoose = require('mongoose');
const User = require("./models/User");

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://localhost:27017/HandiWork").then(()=>
console.log()).catch((err)=>{
          console.log("Some error occured")
})

const seedDB = async () => {
    await User.deleteMany({});
};

seedDB().then(() => {
    mongoose.connection.close()
        .then(() => console.log('Seed status: \x1b[33m Empty\x1b[0m'));
    });