import { useState } from "react";

const Node = ({ thisNode, startNode, endNode, handleMouseDown, handleMouseEnter, handleMouseUp}) => {

    const[rerender, setRerender] = useState(Math.random);

    let getClassName = () => {
        let className = "node";
        if (thisNode === startNode)
            className += " starting-node";
        else if (thisNode === endNode)
            className += " ending-node";
        else if (thisNode.isWall === true)
            className += " wall-node"
        // else if (thisNode.isVisited === true)
        //     className += " visited-node"
        return className;
    }

    let getIdName = () => thisNode.rowIndex + " " + thisNode.colIndex;

    return (
        <div
            id={getIdName()} 
            className={getClassName()} 
            onMouseDown={() => handleMouseDown(thisNode.rowIndex, thisNode.colIndex, `${thisNode.rowIndex} ${thisNode.colIndex}`)}
            onMouseEnter={() => handleMouseEnter(thisNode.rowIndex, thisNode.colIndex, `${thisNode.rowIndex} ${thisNode.colIndex}`)}
            onMouseUp={() => handleMouseUp()}
        ></div>
    )
}

export default Node
