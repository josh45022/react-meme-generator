import React from "react"
import "./Meme.css"

function Meme(props){
        return (
            <div>
            <div onClick={props.canEdit === false?()=>props.edit(props.id):null} className = "memewrapper-wrapper">
                <div className="memewrapper">
                    <h1>{props.top}</h1>
                    <div className="imgwrapper">
                        <img  alt = "test" src={props.img}></img>
                    </div>
                    <h1>{props.bottom}</h1>
                </div>
                    
            </div>
                <button onClick = {()=>props.handleDelete(props.id)} style={{marginBottom: "20px",marginLeft:"367px"}}>Delete Meme</button>
            </div>
        )
    
}



export default Meme