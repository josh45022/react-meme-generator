import Form from './Form';
import Preview from './Preview';
import Meme from './Meme';
import './App.css';
import './Form.css'
import React from 'react'

let imgincrementer = 0

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      topText: "", 
      bottomText: "",
      memes: [],
      completedMemes: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }
  //I was thinking of the this.state.memes to this.state.potentialMemes to be a little more clear
  componentDidMount(){
    fetch("https://api.imgflip.com/get_memes")
        .then( res => res.json())
        .then(res => this.setState({memes: res.data.memes[imgincrementer].url
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
      .then( res => this.setState({memes: res.data.memes[imgincrementer = imgincrementer + 1].url}))
      .catch(err => (console.log(err)))
    console.log('khsgskdhjgKHGSDFKJGFKSDFHK')
    
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
          <Meme top={meme.topText} bottom={meme.bottomText} img={meme.memes}/>
        )
      }
    )
     
      return (
        <div className="App">
          <Form handleClick={this.handleClick} handleChange = {this.handleChange} handleRefresh = {this.handleRefresh}/>
          <Preview img = {this.state.memes} top={this.state.topText} bottom ={this.state.bottomText}/>
          {mappedCompletedMemes}
        </div>
      ) 
    ;
  }
  
}

export default App;
