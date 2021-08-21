import { useState, useEffect } from 'react'
import Node from './Node'
import dijkstraAlgorithm from '../algorithms/Dijkstra'

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
            <button type="button" onClick={dijkstraAlgorithm}>Swap</button>
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
