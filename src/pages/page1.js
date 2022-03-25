import React from "react";
import RouteHandle, { RouteConstants } from "../handle/router/routes"

function onClickHome() {
    RouteHandle.call(RouteConstants.page_home)
}
    
function onClickPage2() {
    RouteHandle.call(RouteConstants.page_page2)
}

export default function Page1() {
    return (
        <div>
            <button onClick={onClickHome}> Home </button> 
            <p>Current Page: ${RouteConstants.page_page1}</p>
            <button onClick={onClickPage2}> Page2 </button>
        </div>
    )
}
