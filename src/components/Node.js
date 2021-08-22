import { useState, useEffect } from "react";

const Node = ({ thisNode, startNode, endNode}) => {

    const[rerender, setRerender] = useState(Math.random);

    let getClassName = () => {
        let className = "node";
        if (thisNode === startNode)
            className += " starting-node";
        else if (thisNode === endNode)
            className += " ending-node";
        else if (thisNode.isWall === true)
            className += " wall-node"
        else if (thisNode.isVisited === true)
            className += " visited-node"
        return className;
    }

    let test = () => {
        console.log("(" + thisNode.rowIndex + ", " + thisNode.colIndex + ")");
        thisNode.isWall = !thisNode.isWall;
        setRerender(Math.random);
    }

    let test2 = () => {
        thisNode.isVisited = !thisNode.isVisited;
        setRerender(Math.random);
    }

    return (
        <div className={getClassName()} onClick={test}>
            
        </div>
    )
}

export default Node
