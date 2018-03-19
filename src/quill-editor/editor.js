import React, { Component } from 'react'

import 'react-quill/dist/quill.bubble.css'
import ReactQuill, { Quill } from 'react-quill'

import { ImageResize } from './imageResize'
import { ImageImport } from './imageImport'
// import { Video } from './quill-video-resize.js'
import './editor.css'

// Add fonts to whitelist
var Font = Quill.import('formats/font')
// We do not add Sans Serif since it is the default
Font.whitelist = ['sans-serif', 'inconsolata', 'roboto', 'mirza', 'sofia']

Quill.register('modules/imageImport', ImageImport)
Quill.register('modules/imageResize', ImageResize)
// Quill.register({ 'formats/video': Video })
Quill.register(Font, true)



class Editor extends Component {
  constructor(props) {
    super(props)
    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null; // ReactQuill component
    this.state = {
      readOnly: false,
      value: "",
      deltas: {}
    }
  }

  componentDidMount() {
    this.attachQuillRefs()
  }
  
  componentDidUpdate() {
    this.attachQuillRefs()
  }
  
  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor();
    // this.quillRef.format('font', 'sofia')
  }
  
  insertText = () => {
    var range = this.quillRef.getSelection();
    let position = range ? range.index : 0;
    this.quillRef.insertText(position, 'Hello, World! ')
  }
  
  saveContents = ()=>{
    this.setState({
      deltas: this.quillRef.getContents()
    },()=>{
      console.log("this.state.deltas::", this.state.deltas)
    })
  }

  loadContents=()=>{
    this.quillRef.setContents(this.state.deltas)
  }

  toggleReadOnly=()=>{
    this.setState({
      readOnly: !this.state.readOnly
    })
  }

  handleTextChange=(value)=>{
    this.setState({
      value
    })
  }

  getStateValue=()=>{
    console.log("this.state.value>>>",this.state.value)
  }

  render() {
    return (
      <div className="editor">
        <ReactQuill
          style={{ height: "500px" }}
          ref={(el) => { this.reactQuillRef = el }}
          modules={Editor.modules}
          formats={Editor.formats}
          placeHolder={"Add anything here..."}
          theme="bubble"
          value={this.state.value}
          onChange={this.handleTextChange}
          readOnly={this.state.readOnly}
        />
        <div className="button-panel">
          <button onClick={this.insertText}>Insert Text</button>
          <button onClick={this.saveContents}>save Deltas Contents Object</button>
          <button onClick={this.loadContents}>load Deltas Contents Object</button>
          <button onClick={this.getStateValue}>get State Value(string)</button>
          <button onClick={this.toggleReadOnly}>{this.state.readOnly?"Edit":"Finish Editing"}</button>
        </div>
      </div>
      
    )
  }
}

Editor.modules = {
  imageImport: true,
  imageResize:{
    displaySize: true
  },
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
    ['blockquote', 'code-block'],                    // blocks
    [{ 'header': 1 }, { 'header': 2 }],              // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
    [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
    [{ 'direction': 'rtl' }],                        // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
    [{ 'color': ['white', 'red', 'green', 'yellow','blue', '#3293ca', '#575452'] },
     { 'background': ['white', 'red', 'green', 'yellow','blue', '#3293ca','#575452'] }], // dropdown with defaults
    [{ 'font': ['sans-serif', 'inconsolata', 'roboto', 'mirza', 'sofia'] }],                                // font family
    [{ 'align': [] }],                               // text align
    ['image', 'video'],
    ['clean'],                                       // remove formatting
  ],
}

Editor.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'background',
  'list', 'bullet', 'indent', 'align',
  'size', 'color', 'font',
  'link', 'image', 'video', 'width'
]


export default Editor
