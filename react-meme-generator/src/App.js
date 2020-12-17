import Form from './Form';
import Preview from './Preview';
import Meme from './Meme';
import './App.css';
import './Form.css'
import React from 'react'

let imgIncrementer = 0
let completedIncrementer = 0

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      canEdit: false,
      topText: "", 
      bottomText: "",
      memes: [],
      completedMemes: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }
  //I was thinking of the this.state.memes to this.state.potentialMemes to be a little more clear
  componentDidMount(){
    fetch("https://api.imgflip.com/get_memes")
        .then( res => res.json())
        .then(res => this.setState({memes: res.data.memes[imgIncrementer].url
        }))
        .catch(err => console.log(err))
}

  
  handleChange(event){
    const{name, value} = event.target
    this.setState({
      [name]: value
    })
  }
  handleRefresh(event){
    event.preventDefault() //would not let me go to the next image wthout refreshing if i didn't do this.smh. i think it's because the button is in a form.
    fetch("https://api.imgflip.com/get_memes")
      .then( res => res.json())
      .then( res => this.setState({memes: res.data.memes[imgIncrementer = imgIncrementer + 1].url}))
      .catch(err => (console.log(err)))
    
  }
  handleEdit(event) {
    event.preventDefault()
    this.setState((prevState)=>{
      return {
      canEdit: !prevState.canEdit
      }
    }
    )
  }
  handleClick(event){
    event.preventDefault()
    this.setState(
      function(prevState) {
        return {
          topText: "",
          bottomText: "",
          completedMemes: [
              ...prevState.completedMemes,
              {
                topText: prevState.topText,
                bottomText: prevState.bottomText,
                memes: prevState.memes
              }
          ]
        }
    })
  }
  
  render(){
    const mappedCompletedMemes = this.state.completedMemes.map(
      function(meme) {
        return (
          <Meme handleEdit = {()=>(this.handleEdit())} incrementer = {completedIncrementer} top={meme.topText} bottom={meme.bottomText} img={meme.memes}/>
        )
      }
    )
    //handleEdit needed to be in an arrow function for some reason.
    if(this.state.canEdit === false) {
        return (
          <div className="App">
            <Form handleClick={this.handleClick} handleChange = {this.handleChange} handleRefresh = {this.handleRefresh}/>
            <Preview img = {this.state.memes} top={this.state.topText} bottom ={this.state.bottomText}/>
            {mappedCompletedMemes}
          </div>
        ) 
      ;
    }

    if(this.state.canEdit === true){
      return (
        <div className="App">
            <Form handleClick={this.handleClick} handleChange = {this.handleChange} handleRefresh = {this.handleRefresh}/>
            {mappedCompletedMemes}
          </div>
      )
    }
     
      
  }
  
}

export default App;
