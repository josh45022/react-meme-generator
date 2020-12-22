import Form from './Form';
import Preview from './Preview';
import Meme from './Meme';
import './App.css';
import './Form.css'
import React from 'react'
let filteredEditMeme = []
let imgIncrementer = 0
let indexFinder = 0
class App extends React.Component {
  constructor(){
    super()
    this.state = {
      topText: "", 
      bottomText: "",
      imgUrl: "",
      completedMemes: [],
      canEdit: false,
      id: Math.random()*100
    }
  }
  componentDidMount(){
    fetch("https://api.imgflip.com/get_memes")
        .then( res => res.json())
        .then(res => this.setState(
          {imgUrl: res.data.memes[imgIncrementer].url,
        }))
        .catch(err => console.log(err))
}

  handleSave = (event) => {
    event.preventDefault()
    this.setState(function(prevState) {
      let splicedPrevCompleted = [...prevState.completedMemes.splice(indexFinder, 1)]
      return{
      canEdit: false,
      topText: "",
      bottomText: "",
      completedMemes: 
        [ ...prevState.completedMemes,
          {
          topText: prevState.topText,
          bottomText: prevState.bottomText,
          imgUrl: prevState.imgUrl,
          id: prevState.id
          }
        ]
    

    }})
  }
  handleChange = (event) => {
    const{name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleRefresh = (event) => {
    event.preventDefault()
    fetch("https://api.imgflip.com/get_memes")
      .then( res => res.json())
      .then( res => this.setState({imgUrl: res.data.memes[imgIncrementer = imgIncrementer + 1].url, }))
      .catch(err => (console.log(err)))
    
  }
  handleEdit = (id) => {
    const filteredEditMeme = this.state.completedMemes.filter(
      (meme, index) => (meme.id === id))
      console.log("Filtered meme",typeof filteredEditMeme)
      let fakeCompleted = [...this.state.completedMemes]
      console.log(fakeCompleted)
      console.log(filteredEditMeme[0].id)
      indexFinder = fakeCompleted.findIndex(i => i.id === filteredEditMeme[0].id) 
      console.log(indexFinder)
  
    this.setState(
         {
          canEdit: true,
          imgUrl: filteredEditMeme[0].imgUrl,
          topText: filteredEditMeme[0].topText,
          bottomText: filteredEditMeme[0].bottomText,
        }
      
      )
}

  handleClick = (event) =>{
    event.preventDefault()
    this.setState(
      function(prevState) {
        return {
          canEdit: false,
          id: Math.random()*100,
          topText: "",
          bottomText: "",
          completedMemes: [
              ...prevState.completedMemes,
              {
                topText: prevState.topText,
                bottomText: prevState.bottomText,
                imgUrl: prevState.imgUrl,
                id: prevState.id
              }
          ],
        }
    })

    
  }
  handleDelete = (id) => {
    const postDeletionMemes = this.state.completedMemes.filter(
      meme => (meme.id !== id))
      console.log(filteredEditMeme[0])
    this.setState({
      completedMemes: postDeletionMemes
    })
  }



  render(){
    const mappedCompletedMemes = this.state.completedMemes.map(
      (meme, index) => {
        return (
          <div className = {`meme${index}`}>
            <Meme handleSave={this.handleSave} id={meme.id} canEdit={this.state.canEdit} handleEdit={this.handleEdit} handleDelete={this.handleDelete} top={meme.topText} bottom={meme.bottomText} img={meme.imgUrl}/>
          </div>
          
        )
      }
    )
  
    
    if(this.state.canEdit === false) {
        return (
          <div className="App">
            <Form 
            handleSave = {this.handleSave}
            handleClick={this.handleClick} 
            handleChange = {this.handleChange} 
            handleRefresh = {this.handleRefresh}
            handleEditClick = {this.handleEditClick}
            handleDelete = {this.handleDelete}
            topText = {this.state.topText}
            bottomText = {this.state.bottomText}
            canEdit = {this.state.canEdit}
            />
            <Preview img = {this.state.imgUrl} top={this.state.topText} bottom ={this.state.bottomText}/>
              {mappedCompletedMemes}
            
          </div>
        ) 
      ;
    }

    if(this.state.canEdit === true){
      return (
        <div className="App">
          <Form 
            handleSave = {this.handleSave}
            handleClick={this.handleClick} 
            handleChange = {this.handleChange} 
            handleRefresh = {this.handleRefresh}
            handleEditClick = {this.handleEditClick} 
            handleDelete = {this.handleDelete}
            topText = {this.state.topText}
            bottomText = {this.state.bottomText}
            canEdit = {this.state.canEdit}
            />
               <Meme 
              handleSave = {this.handleSave} 
              handleClick={this.handleClick} 
              top={this.state.topText}
              bottom={this.state.bottomText}
              img = {this.state.imgUrl}
              handleEdit={this.handleEdit}
              canEdit = {this.state.canEdit}
              handleDelete={this.handleDelete}
              /> 
              
            
        </div>
      ) 
    ;
  }
  
}
}

export default App;
