import React, { Component } from 'react'
import Editor from './quill-editor/editor'
// import CustomFormat from './quill-editor/customFormat'
import './App.css'

class App extends Component {
  render(){
    return (
      <div className="app">
        <Editor />
        <hr />
        <br />
        {/* <CustomFormat /> */}
      </div>
    )
  }


}


export default App
