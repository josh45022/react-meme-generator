import React from 'react';


function Form(props){
    return (
        <div className="form-container">
            <form name="meme-form" className="meme-form">
                <div>
                    <label>Top Text: 
                        <input
                            name="topText"
                            type="text"
                            onChange ={props.handleChange}
                            value={props.topText}>
                        </input>
                    </label>
                </div>

                <div>
                    <label>Bottom Text: 
                        <input
                            name="bottomText"
                            type="text"
                            onChange ={props.handleChange}
                            value={props.bottomText}>
                        </input>
                    </label>
                </div>
                <button onClick={props.handleRefresh} type="submit">Refresh meme</button>
                {props.canEdit ? <button type="button" onClick={props.handleSave}>Editing</button> : <button type="submit" onClick={props.handleClick}>Create Meme</button>}
                

            </form>

        </div>
    )
}



export default Form;