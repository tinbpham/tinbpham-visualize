
let dijkstraAlgorithm = (grid, startingNode, endingNode) => {
    // For order of visited nodes to animating/visualizing in main
    let arrayOfVisitedNodesToAnimate = [];
    let minHeapOfUnvisitedNodes = getMinHeapOfUnvisitedNodes(grid, startingNode);
    
    while (minHeapOfUnvisitedNodes !== 0) { // while there's still unvisited nodes
        let currentNode = minHeapOfUnvisitedNodes[0];

        if (currentNode.isWall === true)    // Skip currentNode because it's a wall
            continue;
        if (currentNode.distance === Infinity)  // Couldn't find the ending node so animate the visited nodes
            return arrayOfVisitedNodesToAnimate; 
        
        updateDistanceOfUnvisitedNeighbors(currentNode, grid, minHeapOfUnvisitedNodes);
    }

    return arrayOfVisitedNodesToAnimate;
}

let updateDistanceOfUnvisitedNeighbors = (currentNode, grid, minHeap) => {
    let unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (let node of unvisitedNeighbors) {
        let newDistance = Math.min(node.distance, currentNode.distance + 1);
        let nodeIndexInMinHeap = findNodeIndexInMinHeap(node, minHeap);
        minHeapDecreaseKey(nodeIndexInMinHeap, newDistance, minHeap);
    }
}

let getUnvisitedNeighbors = (currentNode, grid) => {
    let unvisitedNeighbors = [];
    let {rowIndex, colIndex} = currentNode;
    // Unvisited Neightbor left(West) the current node
    if (colIndex > 0 && !grid[rowIndex][colIndex - 1].isVisited) 
        unvisitedNeighbors.push(grid[rowIndex][colIndex - 1]);
    // Unvisited Neightbor below(South) the current node
    if (rowIndex < grid.length - 1 && !grid[rowIndex + 1][colIndex].isVisited) 
        unvisitedNeighbors.push(grid[rowIndex - 1][colIndex]);    
    // Unvisited Neightbor right(East) the current node
    if (colIndex < grid[0].length - 1 && !grid[rowIndex][colIndex + 1].isVisited) 
        unvisitedNeighbors.push(grid[rowIndex][colIndex + 1]);
    // Unvisited Neighbor above(North) the current node
    if (rowIndex > 0 && !grid[rowIndex - 1][colIndex].isVisited) 
        unvisitedNeighbors.push(grid[rowIndex - 1][colIndex]);
    
    return unvisitedNeighbors;
}

let findNodeIndexInMinHeap = (node, minHeap) => {
    for (let index = 0; index < minHeap; index++)
        if (minHeap[index] === node) return index;
    return -1;
}

let minHeapDecreaseKey = (nodeIndex, newDistance, minHeap) => {
    let traversalIndex = nodeIndex;
    let parentIndex = Math.floor((traversalIndex - 1)/2);
    minHeap[nodeIndex].distance = newDistance;
    // while the node has a parent and it's value is smaller than its parent, swap
    while (traversalIndex > 0 && minHeap[traversalIndex].distance < minHeap[parentIndex].distance) {
        let tempTravNode = minHeap[traversalIndex];
        minHeap[traversalIndex] = minHeap[parentIndex];
        minHeap[parentIndex] = tempTravNode;
        traversalIndex = parentIndex;
        parentIndex = Math.floor((traversalIndex - 1)/2);
    }
}

let getMinHeapOfUnvisitedNodes = (grid, startingNode) => {
    // All nodes have an initial distance of Infinity except for the starting node
    // Place starting node at index 0, puts all other nodes afterwards
    let minHeap = [];
    startingNode.distance = 0;
    minHeap.push(startingNode);
    for (let rows of grid) {
        for (let node of rows) {
            if (node !== startingNode)
                minHeap.push(node);
        }
    }
    return minHeap;
}

export default dijkstraAlgorithm;