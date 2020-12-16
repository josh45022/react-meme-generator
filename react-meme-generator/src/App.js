import Form from './Form';
import Preview from './Preview';
import Meme from './Meme';
import './App.css';
import './Form.css'
import React from 'react'


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      topText: "", 
      bottomText: "",
      memes: [],
      imgUrl: '',
      completedMemes: []
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    const{name, value} = event.target
    this.setState({
      [name]: value
    })
    console.log(this.state)
  }
  render(){
    return (
      <div className="App">
        <Preview />
        <Form handleChange = {this.handleChange}/>
        <Meme />
      </div>
    );
  }
  
}

export default App;
