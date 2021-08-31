import { useState, useEffect } from 'react'
import Node from './Node'

// Algorithms to Import
import dijkstraAlgorithm from '../algorithms/Dijkstra'
import aStarAlgorithm from '../algorithms/Astar'

let GRID_ROW_SIZE = 24;
let GRID_COL_SIZE = 48;
let INITIAL_START_NODE_ROW = 12;
let INITIAL_START_NODE_COL = 16;
let INITIAL_END_NODE_ROW = 12;
let INITIAL_END_NODE_COL = 31;

const SearchingAlgorithm = () => {
    
    const[grid, setGrid] = useState([]);
    const[startingNode, setStartingNode] = useState();
    const[endingNode, setEndingNode] = useState();
    const[windowDimensions, setWindowDimension] = useState(getWindowDimensions);
    const[animationSpeed, setAnimationSpeed] = useState(10);
    const[isMouseDown, setIsMouseDown] = useState(false);
    const[onClickIsWall, setOnClickIsWall] = useState(false);
    // const[rerender, setRerender] = useState(Math.random);
    let algorithmToVisualize = () => console.log("Please pick an Algorithm");

    useEffect (() => {
        // Responsively set the grid size and start/end node
        GRID_COL_SIZE = Math.ceil(windowDimensions.width / 30);
        GRID_ROW_SIZE = Math.floor(windowDimensions.height / 30) - 1; // Making space for header
        INITIAL_START_NODE_ROW = Math.floor(GRID_ROW_SIZE / 2);
        INITIAL_END_NODE_ROW = Math.floor(GRID_ROW_SIZE / 2);
        INITIAL_START_NODE_COL = Math.floor(GRID_COL_SIZE * (1/3) - 1);
        INITIAL_END_NODE_COL = Math.floor(GRID_COL_SIZE - INITIAL_START_NODE_COL - 2);

        // Create a 2d array of nodes with their respective rows and cols
        let finalGridArray = [];
        for (let rowIndex = 0; rowIndex < GRID_ROW_SIZE; rowIndex++) {
            let gridRows = [];
            for (let colIndex = 0; colIndex < GRID_COL_SIZE; colIndex++) {
                let newGridNode = createNewNode(rowIndex, colIndex);
                if (rowIndex === INITIAL_START_NODE_ROW && colIndex === INITIAL_START_NODE_COL)
                    setStartingNode(newGridNode);
                else if (rowIndex === INITIAL_END_NODE_ROW && colIndex === INITIAL_END_NODE_COL)
                    setEndingNode(newGridNode);
                gridRows.push(newGridNode);
            }
            finalGridArray.push(gridRows);
        }

        setGrid(finalGridArray);
    }, [windowDimensions])

    let createNewNode = (rowIndex, colIndex) => {
        return {
            rowIndex,
            colIndex,
            // isStart,
            // isEnd,
            isWall: false,
            isVisited: false,
            distance: Infinity,
            prevNode: null,
        }
    }

    const printGrid = () => {
        let strHeader = "    ";
        for (let col = 0; col < grid[0].length; col++) {
            strHeader += (col + (col > 8 ? "  " : "   "));
        }
        console.log(strHeader);
        for (let row = 0; row < grid.length; row++) {
            let str = "";
            str += (row + (row > 9 ? " " : "  "));
            for (let entry = 0; entry < grid[row].length; entry++) {
                str += "[";
                if (grid[row][entry] === startingNode) str += "S";
                else if (grid[row][entry] === endingNode) str += "X";
                else if (grid[row][entry].isWall === true) str += "■";
                else if (grid[row][entry].isVisited === true) str += "V";
                else str += " ";
                str += "] ";
            }
            console.log(str);
        }
    }

    let visualizeAlgorithm = () => {
        let visitedNodesInOrder = algorithmToVisualize(grid, startingNode, endingNode);

        
        for (let index = 0; index < visitedNodesInOrder.length; index++) {
            let idName = visitedNodesInOrder[index].rowIndex + " " + visitedNodesInOrder[index].colIndex;
            setTimeout(() => {
                if (visitedNodesInOrder[index] !== startingNode && visitedNodesInOrder[index] !== endingNode)
                    document.getElementById(idName).className += ' visited-node';
            }, animationSpeed * index)
        }
        // If there was a path to ending node, animate it
        if (endingNode.prevNode) {
            let currentNode = endingNode.prevNode;
            let pathArray = [];
            while (currentNode !== startingNode) {
                pathArray.push(currentNode.rowIndex + " " + currentNode.colIndex);
                currentNode = currentNode.prevNode;
            }
            // Wait for animating visited nodes to finish
            setTimeout(() => {
                for (let index = pathArray.length - 1; index >= 0; index--) {
                    let idName = pathArray[index]
                    setTimeout(() => {
                        document.getElementById(idName).className += ' path-node';
                    }, 2 * animationSpeed * (pathArray.length - index))
                }    
            }, animationSpeed * visitedNodesInOrder.length)
            
        }
        
    }

    // Taken from Stackoveflow
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
    }

    let printWindowDimensions = () => {
        let {width, height} = windowDimensions;
        console.log(width + "px x " + height + "px")
    }

    let handleMouseDown = (row, col, idName) => {
        let clickedNode = grid[row][col];
        clickedNode.isWall = !clickedNode.isWall;
        setOnClickIsWall(grid[row][col].isWall);

        if (onClickIsWall === true)
            document.getElementById(idName).classList.remove("wall-node");
        else
            document.getElementById(idName).className += " wall-node";
        setIsMouseDown(true);
    }

    let handleMouseUp = () => {
        setIsMouseDown(false);
    }

    let handleMouseEnter = (row, col, idName) => {
        
        if (isMouseDown && grid[row][col] !== startingNode && grid[row][col] !== endingNode) {
            console.log("yo3")
            grid[row][col].isWall = true;
            document.getElementById(idName).className += " wall-node";
        }
    }

    return (
        <div>
            <button type="button" onClick={printGrid}>Debug</button>
            <button type="button" onClick={visualizeAlgorithm}>Visualize</button>
            <button type="button" onClick={() => {algorithmToVisualize = dijkstraAlgorithm}}>Dijkstra</button>
            <button type="button" onClick={() => {algorithmToVisualize = aStarAlgorithm}}>A*</button>
            <button type="button" onClick={printWindowDimensions}>Dimensions</button>
            <button type="button" onClick={() => {setAnimationSpeed(5)}}>Fast</button>
            <button type="button" onClick={() => {setAnimationSpeed(10)}}>Medium</button>
            <button type="button" onClick={() => {setAnimationSpeed(15)}}>Slow</button>
            {grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="grid-row">
                        {row.map((node, colIndex) => <Node 
                            key={colIndex}
                            thisNode={grid[rowIndex][colIndex]}
                            startNode={startingNode}
                            endNode={endingNode}
                            handleMouseDown={handleMouseDown}
                            handleMouseEnter={handleMouseEnter}
                            handleMouseUp={handleMouseUp}
                        />)}
                    </div>
                )
            })}
        </div>
    )
    
    
}

export default SearchingAlgorithm
