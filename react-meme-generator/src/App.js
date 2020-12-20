import Form from './Form';
import Preview from './Preview';
import Meme from './Meme';
import MemeEditor from './MemeEditor.js'
import './App.css';
import './Form.css'
import React from 'react'

let imgIncrementer = 0
let completedIncrementer = 0
class App extends React.Component {
  constructor(){
    super()
    this.state = {
      topText: "", 
      bottomText: "",
      memes: [],
      completedMemes: [],
      canEdit: false,
      id: 0
    }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this)
    // this.handleRefresh = this.handleRefresh.bind(this)
    // this.handleEdit = this.handleEdit.bind(this)
    // this.handleDelete = this.handleDelete.bind(this);
  }
  //I was thinking of the this.state.memes to this.state.potentialMemes to be a little more clear
  componentDidMount(){
    fetch("https://api.imgflip.com/get_memes")
        .then( res => res.json())
        .then(res => this.setState(
          {memes: res.data.memes[imgIncrementer].url,
          id: res.data.memes[imgIncrementer].id 
        }))
        .catch(err => console.log(err))
}

  
  handleChange = (event) => {
    const{name, value} = event.target
    this.setState({
      [name]: value
    })
  }
  // handleEditChange = () => {

  // }

  handleRefresh = (event) => {
    event.preventDefault() //would not let me go to the next image wthout refreshing if i didn't do this.smh. i think it's because the button is in a form.
    fetch("https://api.imgflip.com/get_memes")
      .then( res => res.json())
      .then( res => this.setState({memes: res.data.memes[imgIncrementer = imgIncrementer + 1].url, id: res.data.memes[imgIncrementer =imgIncrementer+1].id }))
      .catch(err => (console.log(err)))
    
  }
  handleEdit = (id) => {
    
    const filteredEditMeme = this.state.completedMemes.filter(
      meme => (meme.id === id))
      console.log(filteredEditMeme[0])      
      
      
    this.setState(
          (prevState) => {
          return {
          canEdit: !prevState.canEdit,
          topText: filteredEditMeme[0].topText,
          bottomText: filteredEditMeme[0].bottomText
          }
      }
    )
  }
  // handleEditClick = (event, id) => {
  //   event.preventDefault()
  //   const filteredEditMeme = this.state.completedMemes.filter(
  //     meme => (meme.id === id))
  //   this.setState({meme: filteredEditMeme,
  //     topText: filteredEditMeme[0].topText,
  //     bottomText: filteredEditMeme[0].bottomText
  //   })
  // }
  
  handleClick = (event) =>{
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
                memes: prevState.memes,
                id: prevState.id
              }
          ],
        }
    })
    
  }
  handleDelete = (event) => {
    // event.preventDefault()
    // this.setState({
    //   completedMeme[completedIncrementer].img: null
    // })
  }



  render(){
    const mappedCompletedMemes = this.state.completedMemes.map(
      (meme, index) => {
        return (
          <div className = {`meme${index}`}>
            <Meme id={meme.id} edit={this.handleEdit} index = {completedIncrementer = index} top={meme.topText} bottom={meme.bottomText} img={meme.memes}/>
          </div>
          
        )
      }
    )
  
    
    if(this.state.canEdit === false) {
        return (
          <div className="App">
            <Form 
            handleClick={this.handleClick} 
            handleChange = {this.handleChange} 
            handleRefresh = {this.handleRefresh}
            handleEditClick = {this.handleEditClick}
            handleDelete = {this.handleDelete}
            topText = {this.state.topText}
            bottomText = {this.state.bottomText}
            canEdit = {this.state.canEdit}
            />
            <Preview img = {this.state.memes} top={this.state.topText} bottom ={this.state.bottomText}/>
              {mappedCompletedMemes}
            
          </div>
        ) 
      ;
    }

    if(this.state.canEdit === true){
      return (
        <div className="App">
          <Form 
            handleClick={this.handleClick} 
            handleChange = {this.handleChange} 
            handleRefresh = {this.handleRefresh}
            handleEditClick = {this.handleEditClick} 
            handleDelete = {this.handleDelete}
            topText = {this.state.topText}
            bottomText = {this.state.bottomText}
            canEdit = {this.state.canEdit}
            />
          <div onClick = {this.handleEdit}>
              <Meme 
              top={this.state.topText}
              bottom={this.state.bottomText}
              img = {this.state.memes}
              edit={this.handleEdit}
              />
          </div>
        </div>
      ) 
    ;
  }
  
}
}

export default App;
