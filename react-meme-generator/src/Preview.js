import React from "react"

import "./Preview.css"
function Preview(props){
        return (
            <div className="wrapper">
                <h1>{props.top}</h1>
                <div>
                    <img  alt = "test"src = {props.img}></img>
                </div>
                <h1>{props.bottom}</h1>
                
                
            </div>
        )
    
}



export default Preview