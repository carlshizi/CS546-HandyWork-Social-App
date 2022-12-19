const graph = require("./utils/Graph")
const mongoose = require('mongoose');
const User = require("./models/User");
const bcrypt = require("bcrypt");
const Post = require("./models/Post");
const Profile = require("./models/Profile");

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://localhost:27017/HandiWork").catch((err) => {
    console.log("Some error occured")
})

const hash = async (password) => {
    const h = await bcrypt.hash(password, 10);
    return h;
};


const main = async () => {


    /**
    Account Holder      |   FriendList
------------------------+---------------------
    Denzel Washington   |   ["Ezra Strong", "Mariyah Allen", "Sam Smith", "Kim Nod", "Dylan Huerta", "Mariyah Allen"]
    Sam Smith           |   ["Jake Hodges", "Cesar Boyd", "Davian Medina", "Kadin Cooke", "Denzel Washington", "Jake Hodges"]
    Kim Nod             |   ["Philip Hampton", "Katelyn Kidd", "Amaris Rush", "Denzel Washington", "Cesar Boyd"] 
    Mariyah Allen       |   ["Ahmad Maynard", "Cesar Boyd", "Denzel Washington"]
    Cesar Boyd          |   ["Kim Nod", "Mariyah Allen", "Arturo Cervantes, "Arturo Cervantes", "Sam Smith"]
    Davian Medina       |   ["Sam Smith", "Johanna Castro", "Arturo Cervantes", "Katelyn Kidd", "Kadin Cooke"]
    Kadin Cooke         |   ["Sam Smith", "Davian Medina", "Adeline Shea", "Kendall Pugh"]
    Johanna Castro      |   ["Davian Medina", "Katelyn Kidd", "Philip Hampton"]
    Arturo Cervantes    |   ["Cesar Boyd", "Ulises Shepard", "Jake Hodges", "Davian Medina", "Cesar Boyd"]
    Adeline Shea        |   ["Jake Hodges", "Nina Brock", "Kadin Cooke"]
    Kendall Pugh        |   ["Kadin Cooke", "Ulises Shepard", "Messiah Rollins"]
    Dylan Huerta        |   ["Denzel Washington", "Messiah Rollins", "Dixie Anthony"]
    Katelyn Kidd        |   ["Philip Hampton", "Kim Nod", "Ezra Strong", "Davian Medina", "Johanna Castro", "Kim Nod", "Davian Medina"]
    Amaris Rush         |   ["Kim Nod", "Nina Brock"]
    Ahmad Maynard       |   ["Mariyah Allen", "Ezra Strong"]
    Philip Hampton      |   ["Katelyn Kidd", "Kim Nod", "Johanna Castro", "Ulises Shepard"]
    Jake Hodges         |   ["Arturo Cervantes", "Sam Smith", "Eliana Moreno", "Adeline Shea"]
    Nina Brock          |   ["Amaris Rush", "Adeline Shea"]
    Messiah Rollins     |   ["Dylan Huerta", "Kendall Pugh"]
    Ulises Shepard      |   ["Philip Hampton", "Arturo Cervantes", "Kendall Pugh"]
    Dixie Anthony       |   ["Dylan Huerta"]
    Eliana Moreno       |   ["Jake Hodges"]
    Ezra Strong         |   ["Denzel Washington", "Katelyn Kidd", "Ahmad Maynard"]
 */


    const seedUsers = [
        // Generate 23 Account Profiles
        { username: 'denzel', email: 'dwashington@yahoo.com', password: await hash('VCemuX'), Following: ['sammy', 'kadin'], Followers: ["estrong@gmail.com", "mallen@yahoo.com", "ssmith@aol.com", "knod@hotmail.com", "dhuerta@hotmail.com"], workPosts: [{ username: "Denzel", location: "NYC", postMessage: "I'm great with garages and doors"}, { username: "Denzel", location: "NYC", postMessage: "I'm also willing to negotiate pay"}], image: "http://localhost:5000/uploads\\denzel.jpg" }, // 'Denzel Washington'
        { username: 'sammy', email: 'ssmith@aol.com', password: await hash('tvjXe3'), Following: ['kim', 'jake'], Followers: ["jhodges@msn.com", "cboyd@yahoo.com", "dmedina@aol.com", "kcooke@gmail.com", "dwashington@yahoo.com", "jhodges@msn.com"], workPosts: [{ username: "Sammy", location: "Trenton, NJ", postMessage: "I've built my own house before"}], image: "http://localhost:5000/uploads\\image1.jpg" }, // 'Sam Smith'
        { username: 'kim', email: 'knod@hotmail.com', password: await hash('WwsN3H'), Following: ['nina3'], Followers: ["phampton@google.com", "kkidd@hotmail.com", "arush@gmail.com", "dwashington@yahoo.com", "cboyd@yahoo.com"], workPosts: [{ username: "Kim", location: "Hoboken", postMessage: "My specialty is doors. Also, I'm allergic to dogs."}], image: "http://localhost:5000/uploads\\image4.jpg" }, // "Kim Nod"
        { username: 'mallen', email: 'mallen@yahoo.com', password: await hash('mmmEx4'), Following: ['cboyd'], Followers: ["amaynarf@aol.com", "cboyd@yahoo.com", "dwashington@yahoo.com"], workPosts: [{ username: "Mallen", location: "New Brunswick, NJ", postMessage: "My expected wage is $20 an hour"}], image: "http://localhost:5000/uploads\\image13.jpg" }, // "Mariyah Allen"
        { username: 'cboyd', email: 'cboyd@yahoo.com', password: await hash('GhmVH8'), Following: ['phil'], Followers: ["knod@hotmail.com", "mallen@yahoo.com", "acervantes@google.com", "ssmith@aol.com"], workPosts: [], image: "http://localhost:5000/uploads\\image14.jpg" }, // "Cesar Boyd"
        { username: 'david02', email: 'dmedina@aol.com', password: await hash('4KwwL8'), Following: ['nina3'], Followers: ["ssmith@aol.com", "jcastro@yahoo.com", "acervantes@google.com", "kkidd@hotmail.com", "kcooke@gmail.com"], workPosts: [{ username: "david02", location: "Newark, NJ", postMessage: "I'll do everything except plumbing issues"}], image: "http://localhost:5000/uploads\\image21.jpg" }, // "Davian Medina"
        { username: 'kadin', email: 'kcooke@gmail.com', password: await hash('UFgPZX'), Following: ['kate43'], Followers: ["ssmith@aol.com", "dmedina@aol.com", "ashea@aol.com", "kpugh@yahoo.com"], workPosts: [{ username: "kadin", location: "NYC", postMessage: "Very good with kitchens"}], image: "http://localhost:5000/uploads\\image22.jpg" }, // "Kadin Cooke"
        { username: 'johan1', email: 'jcastro@yahoo.com', password: await hash('ZpJtQG'), Following: ['amaris'], Followers: ["dmedina@aol.com", "kkidd@hotmail.com", "phampton@google.com"], workPosts: [{ username: "johan1", location: "Manhattan", postMessage: "Windows are my specialty"}], image: "http://localhost:5000/uploads\\image12.jpg" }, // "Johanna Castro"
        { username: 'artolr', email: 'acervantes@google.com', password: await hash('LrrVvh'), Following: ['ahmad9', 'messiah'], Followers: ["cboyd@yahoo.com", "ushepard@aol.com", "jhodges@msn.com", "dmedina@aol.com", "cboyd@yahoo.com"], workPosts: [{ username: "artolr", location: "Queens", postMessage: "Please don't be weird"}], image: "http://localhost:5000/uploads\\image11.jpg" }, // "Arturo Cervantes"
        { username: 'adeline', email: 'ashea@aol.com', password: await hash('PzpVwu'), Following: ['dixie1'], Followers: ["jhodges@msn.com", "nbrock@angelfire.com", "kcooke@gmail.com"], workPosts: [{ username: "adeline", location: "Brooklyn", postMessage: "Message me for pricing"}], image: "http://localhost:5000/uploads\\image19.jpg" }, // "Adeline Shea"
        { username: 'kendal3', email: 'kpugh@yahoo.com', password: await hash('WJZMs3'), Following: ['ulises'], Followers: ["kcooke@gmail.com", "ushepard@aol.com", "mrollins@gmail.com"], workPosts: [{ username: "kendal3", location: "Bronx", postMessage: "Any problem in the house, I can fix!"}], image: "http://localhost:5000/uploads\\image20.jpg" }, // "Kendall Pugh"
        { username: 'dylan', email: 'dhuerta@hotmail.com', password: await hash('UYTh3x'), Following: ['eliana07'], Followers: ["dwashington@yahoo.com", "mrollins@gmail.com", "danthony@yahoo.com"], workPosts: [], image: "http://localhost:5000/uploads\\image10.jpg" }, // "Dylan Huerta"
        { username: 'kate43', email: 'kkidd@hotmail.com', password: await hash('ZnbLDD'), Following: ['sammy'], Followers: ["phampton@google.com", "knod@hotmail.com", "estrong@gmail.com", "dmedina@aol.com", "jcastro@yahoo.com", "knod@hotmail.com", "dmedina@aol.com"], workPosts: [{ username: "kate43", location: "Hudson Yards", postMessage: "Serious inquiries only please"}], image: "http://localhost:5000/uploads\\image3.jpg" }, // "Katelyn Kidd"
        { username: 'amaris', email: 'arush@gmail.com', password: await hash('HU3U6S'), Following: ['cboyd', 'denzel'], Followers: ["knod@hotmail.com", "nbrock@angelfire.com"], workPosts: [], image: "http://localhost:5000/uploads\\image18.jpg" }, // "Amaris Rush"
        { username: 'ahmad9', email: 'amaynarf@aol.com', password: await hash('GjPVX9'), Following: ['mallen'], Followers: ["mallen@yahoo.com", "estrong@gmail.com"], workPosts: [], image: "http://localhost:5000/uploads\\image9.jpg" }, // "Ahmad Maynard"
        { username: 'phil', email: 'phampton@google.com', password: await hash('PuLfW6'), Following: ['kim', 'sammy'], Followers: ["kkidd@hotmail.com", "knod@hotmail.com", "jcastro@yahoo.com", "ushepard@aol.com"], workPosts: [], image: "http://localhost:5000/uploads\\image8.jpg" }, // "Philip Hampton"
        { username: 'jake', email: 'jhodges@msn.com', password: await hash('bUsJb9'), Following: ['kate43'], Followers: ["acervantes@google.com", "ssmith@aol.com", "emoreno@hotmail.com", "ashea@aol.com"], workPosts: [], image: "http://localhost:5000/uploads\\image7.jpg" }, // "Jake Hodges"
        { username: 'nina3', email: 'nbrock@angelfire.com', password: await hash('j5GPfv'), Following: ['johan1'], Followers: ["arush@gmail.com", "ashea@aol.com"], workPosts: [], image: "http://localhost:5000/uploads\\image17.jpg" }, // "Nina Brock"
        { username: 'messiah', email: 'mrollins@gmail.com', password: await hash('GBUgbd'), Following: ['sammy', 'kadin'], Followers: ["dhuerta@hotmail.com", "kpugh@yahoo.com"], workPosts: [], image: "http://localhost:5000/uploads\\image6.jpg" }, // "Messiah Rollins"
        { username: 'ulises', email: 'ushepard@aol.com', password: await hash('dBtpNk'), Following: ['nina3'], Followers: ["phampton@google.com", "acervantes@google.com", "kpugh@yahoo.com"], workPosts: [], image: "http://localhost:5000/uploads\\image5.jpg" }, // "Ulises Shepard"
        { username: 'dixie1', email: 'danthony@yahoo.com', password: await hash('gApGnd'), Following: ['artolr'], Followers: ["dhuerta@hotmail.com"], workPosts: [], image: "http://localhost:5000/uploads\\image16.jpg" }, // "Dixie Anthony"
        { username: 'eliana07', email: 'emoreno@hotmail.com', password: await hash('VC2zjC'), Following: ['amaris'], Followers: ["jhodges@msn.com"], workPosts: [], image: "http://localhost:5000/uploads\\image15.jpg" }, // "Eliana Moreno"
        { username: 'ezrast', email: 'estrong@gmail.com', password: await hash('VCemuX'), Following: ['adeline', 'messiah'], Followers: ["dwashington@yahoo.com", "kkidd@hotmail.com", "amaynarf@aol.com"], workPosts: [], image: "http://localhost:5000/uploads\\image2.jpg" } // "Ezra Strong"
    ];

    const seedPosts = [
        //Generate 12 Posts
        { username: "Denzel", location: "NYC", postMessage: "I'm great with garages and doors"},
        { username: "Denzel", location: "NYC", postMessage: "I'm also willing to negotiate pay"},
        { username: "Sammy", location: "Trenton, NJ", postMessage: "I've built my own house before"},
        { username: "Kim", location: "Hoboken", postMessage: "My specialty is doors. Also, I'm allergic to dogs."},
        { username: "Mallen", location: "New Brunswick, NJ", postMessage: "My expected wage is $20 an hour"},
        { username: "david02", location: "Newark, NJ", postMessage: "I'll do everything except plumbing issues"},
        { username: "kadin", location: "NYC", postMessage: "Very good with kitchens"},
        { username: "johan1", location: "Manhattan", postMessage: "Windows are my specialty"},
        { username: "artolr", location: "Queens", postMessage: "Please don't be weird"},
        { username: "adeline", location: "Brooklyn", postMessage: "Message me for pricing"},
        { username: "kendal3", location: "Bronx", postMessage: "Any problem in the house, I can fix!"},
        { username: "kate43", location: "Hudson Yards", postMessage: "Serious inquiries only please"}        
    ];

    const seedProfiles = [
        //Generate 11 Profiles
        { username: "denzel", name: "Denzel Washington", handyman: "yes", skills: "I can clean AND cook", bio: "I'm kind of a good actor"},
        { username: "sammy", name: "Sammy SweetHeart", handyman: "yes", skills: "I'm great with pavements", bio: "Born n raised in philly"},
        { username: "kim", name: "Kim Kardashian", handyman: "yes", skills: "Swimming", bio: "Trying to make a living here"},
        { username: "mallen", name: "Malloc Washington", handyman: "yes", skills: "Comedy and being lazy", bio: "I was the funniest kid in class in HS"},
        { username: "david02", name: "David Hiddleston", handyman: "yes", skills: "None, but I'm funny", bio: "I'm a cook on the side"},
        { username: "kadin", name: "Kait Jenner", handyman: "yes", skills: "I don't really know tbh", bio: "I'm a STEM major"},
        { username: "johan1", name: "Johan Lynburg", handyman: "yes", skills: "Great at basketball", bio: "I have 2 sisters"},
        { username: "artolr", name: "Artol Visaly", handyman: "yes", skills: "Remodeled homes before", bio: "Born n raised in NJ"},
        { username: "adeline", name: "Adeline Washington", handyman: "yes", skills: "I'm even a great writer", bio: "Born n raised in Atlantic City"},
        { username: "kendal3", name: "Kendal Jones", handyman: "yes", skills: "Why am I on this site?", bio: "Homegrown New Yorker"},
        { username: "kate43", name: "Kate Spade", handyman: "yes", skills: "None, but I can learn", bio: "Aspiring artist"}
    ];

    await User.deleteMany({});
    await User.insertMany(seedUsers);

    await Post.deleteMany({});
    await Post.insertMany(seedPosts);

    await Profile.deleteMany({});
    await Profile.insertMany(seedProfiles);

    mongoose.connection.close();
    console.log('\nSeed status: \x1b[33m completed\x1b[0m');
};

main().catch((error) => {
    console.log(error);
});
