import React from "react"

function MemeEditor(props) {
    return (
        <div className="editmemewrapper">
            <h1>{props.top}</h1>
            <div className="editimgwrapper">
                <img  alt = "test" src={props.img}></img>
            </div>
            <h1>{props.bottom}</h1>
        </div>
    )
}

export default MemeEditor