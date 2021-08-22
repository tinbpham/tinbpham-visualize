import { useState } from 'react'

let dijkstraAlgorithm = (grid, startingNode, endingNode) => {
    console.log("From Dijkstra.js")
    let arrayOfVisistedNodesInOrder = [];
    let currentNode = startingNode;
    while (currentNode !== endingNode) {
        
        currentNode = grid[currentNode.rowIndex][currentNode.colIndex + 1];
        arrayOfVisistedNodesInOrder.push(currentNode);
    }
    return arrayOfVisistedNodesInOrder;
}

export default dijkstraAlgorithm;