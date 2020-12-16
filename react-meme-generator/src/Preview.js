import React from "react"


class Preview extends React.Component{
    constructor(){
        super()
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then( res => res.json())
            .then(res => this.setState ({memes: res.data.memes.map}))
            .catch(err => console.log(err))
    }


    render(){
        return (
        <img ></img>)
    }
}



export default Preview