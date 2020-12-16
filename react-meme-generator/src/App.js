import Form from './Form';
import Preview from './Preview';
import Meme from './Meme';
import './App.css';
import './Form.css'
import React from 'react'


function App() {
  return (
    <div className="App">
      <Preview />
      <Form />
      <Meme />
    </div>
  );
}

export default App;
