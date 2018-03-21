import React, { Component } from 'react'
import Editor from './quill-editor/editor'
import './App.css'

class App extends Component {
  render(){
    return (
      <div className="app">
        <Editor />
        <hr />
        <br />
      </div>
    )
  }


}


export default App
