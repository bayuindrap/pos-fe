import React, {useEffect} from "react";
import {sessionSelector} from "../../../redux/slicer/sessionSlicer";
import { useSelector } from 'react-redux';

const HomePage = () => {
    const sessionData = useSelector(sessionSelector);

    useEffect (() => {
        console.log("data", sessionData)
    })
    return (
        <div>
            {/* <h1 style={{color:"white"}}>HOME PAGE</h1> */}
        </div>
    )
}

export default HomePage