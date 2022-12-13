// graph
class Graph {
	constructor(V){
		this.V = V;
		this.adj = new Map();
	}

	// vertex
	addVertex(v){
	    this.adj.set(v, []);
	}
	
	// add edge
	addEdge(v, w){
	    this.adj.get(v).push(w);
	    this.adj.get(w).push(v);
	}

	// print
	printGraph(){
	    // get vertices
	    const get_keys = this.adj.keys();
	    for(let i of get_keys){
		    let vertices = this.adj.get(i);
		    let conc = "";
		
		    for (let j of vertices)
			    conc += j + " ";

		    console.log(i + " -> " + conc);
	    }
    }


	// bfs
	bfs(u){
		let bfsList = []
	    let visited = {};
	    // Create an object for queue
	    let q = [];
	    visited[u] = true;
	    q.push(u);
	    
	    while (q.length !== 0){
	        // get the element from the queue
	        let node = q.shift();
	        // console.log(node);
			bfsList.push(node);
	        
	        // get the adjacent list for current vertex
	        let adjList = this.adj.get(node);
	        for (let i in adjList){
	            let n = adjList[i];
	            if (!visited[n]){
	                visited[n] = true;
	                q.push(n);
	            }
	        }
	    }
		return bfsList;
	}
}

module.exports = {
	Graph
}