const graph = require("./utils/Graph")
const mongoose = require('mongoose');
const User = require("./models/User");
const bcrypt = require("bcrypt");

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
        { username: 'denzel', email: 'dwashington@yahoo.com', password: await hash('VCemuX'), Friends: ["estrong@gmail.com", "mallen@yahoo.com", "ssmith@aol.com", "knod@hotmail.com", "dhuerta@hotmail.com"] }, // 'Denzel Washington'
        { username: 'sammy', email: 'ssmith@aol.com', password: await hash('tvjXe3'), Friends: ["jhodges@msn.com", "cboyd@yahoo.com", "dmedina@aol.com", "kcooke@gmail.com", "dwashington@yahoo.com", "jhodges@msn.com"] }, // 'Sam Smith'
        { username: 'kim', email: 'knod@hotmail.com', password: await hash('WwsN3H'), Friends: ["phampton@google.com", "kkidd@hotmail.com", "arush@gmail.com", "dwashington@yahoo.com", "cboyd@yahoo.com"] }, // "Kim Nod"
        { username: 'mallen', email: 'mallen@yahoo.com', password: await hash('mmmEx4'), Friends: ["amaynarf@aol.com", "cboyd@yahoo.com", "dwashington@yahoo.com"] }, // "Mariyah Allen"
        { username: 'cboyd', email: 'cboyd@yahoo.com', password: await hash('GhmVH8'), Friends: ["knod@hotmail.com", "mallen@yahoo.com", "acervantes@google.com", "ssmith@aol.com"] }, // "Cesar Boyd"
        { username: 'david02', email: 'dmedina@aol.com', password: await hash('4KwwL8'), Friends: ["ssmith@aol.com", "jcastro@yahoo.com", "acervantes@google.com", "kkidd@hotmail.com", "kcooke@gmail.com"] }, // "Davian Medina"
        { username: 'kadin', email: 'kcooke@gmail.com', password: await hash('UFgPZX'), Friends: ["ssmith@aol.com", "dmedina@aol.com", "ashea@aol.com", "kpugh@yahoo.com"] }, // "Kadin Cooke"
        { username: 'johan1', email: 'jcastro@yahoo.com', password: await hash('ZpJtQG'), Friends: ["dmedina@aol.com", "kkidd@hotmail.com", "phampton@google.com"] }, // "Johanna Castro"
        { username: 'artolr', email: 'acervantes@google.com', password: await hash('LrrVvh'), Friends: ["cboyd@yahoo.com", "ushepard@aol.com", "jhodges@msn.com", "dmedina@aol.com", "cboyd@yahoo.com"] }, // "Arturo Cervantes"
        { username: 'adeline', email: 'ashea@aol.com', password: await hash('PzpVwu'), Friends: ["jhodges@msn.com", "nbrock@angelfire.com", "kcooke@gmail.com"] }, // "Adeline Shea"
        { username: 'kendal3', email: 'kpugh@yahoo.com', password: await hash('WJZMs3'), Friends: ["kcooke@gmail.com", "ushepard@aol.com", "mrollins@gmail.com"] }, // "Kendall Pugh"
        { username: 'dylan', email: 'dhuerta@hotmail.com', password: await hash('UYTh3x'), Friends: ["dwashington@yahoo.com", "mrollins@gmail.com", "danthony@yahoo.com"] }, // "Dylan Huerta"
        { username: 'kate43', email: 'kkidd@hotmail.com', password: await hash('ZnbLDD'), Friends: ["phampton@google.com", "knod@hotmail.com", "estrong@gmail.com", "dmedina@aol.com", "jcastro@yahoo.com", "knod@hotmail.com", "dmedina@aol.com"] }, // "Katelyn Kidd"
        { username: 'amaris', email: 'arush@gmail.com', password: await hash('HU3U6S'), Friends: ["knod@hotmail.com", "nbrock@angelfire.com"] }, // "Amaris Rush"
        { username: 'ahmad9', email: 'amaynarf@aol.com', password: await hash('GjPVX9'), Friends: ["mallen@yahoo.com", "estrong@gmail.com"] }, // "Ahmad Maynard"
        { username: 'phil', email: 'phampton@google.com', password: await hash('PuLfW6'), Friends: ["kkidd@hotmail.com", "knod@hotmail.com", "jcastro@yahoo.com", "ushepard@aol.com"] }, // "Philip Hampton"
        { username: 'jake', email: 'jhodges@msn.com', password: await hash('bUsJb9'), Friends: ["acervantes@google.com", "ssmith@aol.com", "emoreno@hotmail.com", "ashea@aol.com"] }, // "Jake Hodges"
        { username: 'nina3', email: 'nbrock@angelfire.com', password: await hash('j5GPfv'), Friends: ["arush@gmail.com", "ashea@aol.com"] }, // "Nina Brock"
        { username: 'messiah', email: 'mrollins@gmail.com', password: await hash('GBUgbd'), Friends: ["dhuerta@hotmail.com", "kpugh@yahoo.com"] }, // "Messiah Rollins"
        { username: 'ulises', email: 'ushepard@aol.com', password: await hash('dBtpNk'), Friends: ["phampton@google.com", "acervantes@google.com", "kpugh@yahoo.com"] }, // "Ulises Shepard"
        { username: 'dixie1', email: 'danthony@yahoo.com', password: await hash('gApGnd'), Friends: ["dhuerta@hotmail.com"] }, // "Dixie Anthony"
        { username: 'eliana07', email: 'emoreno@hotmail.com', password: await hash('VC2zjC'), Friends: ["jhodges@msn.com"] }, // "Eliana Moreno"
        { username: 'ezrast', email: 'estrong@gmail.com', password: await hash('VCemuX'), Friends: ["dwashington@yahoo.com", "kkidd@hotmail.com", "amaynarf@aol.com"] } // "Ezra Strong"
    ];

    await User.deleteMany({});
    await User.insertMany(seedUsers);

    mongoose.connection.close();
    console.log('\nSeed status: \x1b[33m completed\x1b[0m');
};

main().catch((error) => {
    console.log(error);
});
