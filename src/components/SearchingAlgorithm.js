import { useState, useEffect } from 'react'
import Node from './Node'

// Algorithms to Import
import dijkstraAlgorithm from '../algorithms/Dijkstra'
import aStarAlgorithm from '../algorithms/Astar'

const GRID_ROW_SIZE = 24;
const GRID_COL_SIZE = 48;
const INITIAL_START_NODE_ROW = 12;
const INITIAL_START_NODE_COL = 16;
const INITIAL_END_NODE_ROW = 12;
const INITIAL_END_NODE_COL = 31;

const SearchingAlgorithm = () => {
    
    const[grid, setGrid] = useState([]);
    const[startingNode, setStartingNode] = useState();
    const[endingNode, setEndingNode] = useState();
    const[rerender, setRerender] = useState(Math.random);
    let algorithmToVisualize = () => console.log("Please pick an Algorithm");

    useEffect (() => {
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
    }, [])

    let createNewNode = (rowIndex, colIndex) => {
        return {
            rowIndex,
            colIndex,
            // isStart,
            // isEnd,
            isWall: false,
            isVisited: false,
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
        for (let node of visitedNodesInOrder) {
            console.log(node.rowIndex + ", " + node.colIndex);
            grid[node.rowIndex][node.colIndex].isVisited = true;
            setRerender(Math.random);
        }
    }

    // let initalizeGrid = () => {
    //     let finalGridArray = [];
    //     for (let rowIndex = 0; rowIndex < GRID_ROW_SIZE; rowIndex++) {
    //         let gridRows = [];
    //         for (let colIndex = 0; colIndex < GRID_COL_SIZE; colIndex++) {
    //             let newGridNode = createNewNode(rowIndex, colIndex);
    //             if (rowIndex === INITIAL_START_NODE_ROW && colIndex === INITIAL_START_NODE_COL)
    //                 setStartingNode(newGridNode);
    //             else if (rowIndex === INITIAL_END_NODE_ROW && colIndex === INITIAL_END_NODE_COL)
    //                 setEndingNode(newGridNode);
    //             gridRows.push(newGridNode);
    //         }
    //         finalGridArray.push(gridRows);
    //     }
    //     return finalGridArray;
    // }

    return (
        <div>
            <button type="button" onClick={printGrid}>Debug</button>
            <button type="button" onClick={visualizeAlgorithm}>Visualize</button>
            <button type="button" onClick={() => {algorithmToVisualize = dijkstraAlgorithm}}>Dijkstra</button>
            <button type="button" onClick={() => {algorithmToVisualize = aStarAlgorithm}}>A*</button>
            {grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="grid-row">
                        {row.map((node, colIndex) => <Node 
                            key={colIndex}
                            thisNode={grid[rowIndex][colIndex]}
                            startNode={startingNode}
                            endNode={endingNode}
                        />)}
                    </div>
                )
            })}
        </div>
    )
    
    
}

export default SearchingAlgorithm
