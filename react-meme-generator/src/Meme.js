import React from "react"
import "./Meme.css"

function Meme(props){
        return (
            <div onClick={()=>props.edit(props.id)} className = "memewrapper-wrapper">
                <div className="memewrapper">
                    <h1>{props.top}</h1>
                    <div className="imgwrapper">
                        <img  alt = "test" src={props.img}></img>
                    </div>
                    <h1>{props.bottom}</h1>
                </div>
                    <button onClick = {props.handleDelete} style={{marginBottom: "20px",marginLeft:"367px"}}>Delete Meme</button>
            </div>
        )
    
}



export default Meme