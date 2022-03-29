import React from "react";
import RouteHandle, { RouteConstants } from "../handle/router/routes"

function onClickHome() {
    RouteHandle.call(RouteConstants.page_home)
}
    
function onClickPage1() {
    RouteHandle.call(RouteConstants.page_page1)
}

export default function Page2() {
    return (
        <div>
            <button onClick={onClickHome}> Home </button> 
            <p>Current Page: ${RouteConstants.page_page2}</p>
            <button onClick={onClickPage1}> Page1 </button>
        </div>
    )
}
