import { useState } from 'react'


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
        
        
    }

    // let currentNode = startingNode;
    // while (currentNode !== endingNode) {
        
    //     currentNode = grid[currentNode.rowIndex][currentNode.colIndex + 1];
    //     arrayOfVisistedNodesInOrder.push(currentNode);
    // }
    return arrayOfVisitedNodesToAnimate;
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