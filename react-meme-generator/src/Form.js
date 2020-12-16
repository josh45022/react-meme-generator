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
                            onChange ={console.log("changed")}
                            value={props.topText}>
                        </input>
                    </label>
                </div>

                <div>
                    <label>Bottom Text: 
                        <input
                            name="bottomText"
                            type="text"
                            onChange ={console.log("changed")}
                            value={props.bottomText}>
                        </input>
                    </label>
                </div>
                <button>Refresh meme</button>
                <button type="submit">Create Meme</button>

            </form>

        </div>
    )
}



export default Form;