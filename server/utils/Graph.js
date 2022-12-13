const router = require("express").Router();
const User = require("../models/User");
// const personData = require("./persons")
// const { ObjectId } = require('mongodb')

// const helpers = require("../helpers");
const { Graph } = require("../utils/GraphUtil")


const BFS = async ( RootNode ) => {

    // const personsCollection = await persons();
    // const personsList = await personsCollection.find({}).toArray();

    const allUser = await User.find();


    const V = allUser.length;
    let g = new Graph(V);
    
    // populate vertices    personList = allUser
    let vertices = [];
    for(let i = 0; i < allUser.length; ++i){
        vertices.push(allUser[i].email.toString());
    }

    // add vertices to graph
    for (let i = 0; i < vertices.length; i++){
	    g.addVertex(vertices[i]);   // vertices are all string ids above
    }

    // adding edges    
    for (let i = 0; i < vertices.length; i++){
        for(let j = 0; j < allUser[i].Friends.length; ++j){
            g.addEdge(allUser[i].email, allUser[i].Friends[j]);
        }
    }

    // breadth first search of graph
    const bfs = g.bfs(RootNode);

    // convert ids from bfs above to ObjectId
    // return getAllPersonsById(bfs)
    return bfs
}

// const getAllPersonsById = async ( bfs ) => {
//     let getPersons = []
//     // const allUser = await User.find();
//     // const user = await User.findById(req.params.id);


//     for(let i = 0; i < bfs.length; ++i){
//         getPersons.push(await User.getPersonById(bfs[i]))
//     }
//     return getPersons;
// }

module.exports = {
    BFS
};
