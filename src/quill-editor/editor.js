import React, { Component } from 'react'

import 'react-quill/dist/quill.bubble.css'
import ReactQuill, { Quill } from 'react-quill'
// import BlotFormatter from 'quill-blot-formatter'

import { ImageResize } from './imageResize'
import { ImageImport } from './imageImport'

import './editor.css'

import { Svideo, Mvideo } from './quillVideoFormats'
// import { Video } from './quill-video-resize'
// import './quill-video-resize.css'

// Add fonts to whitelist
var Font = Quill.import('formats/font')
// We do not add Sans Serif since it is the default
Font.whitelist = ['sans-serif', 'inconsolata', 'roboto', 'mirza', 'sofia']


Quill.register('modules/imageImport', ImageImport)
Quill.register('modules/imageResize', ImageResize)
// Quill.register({ 'formats/video': Video })
Quill.register(Font, true)

Quill.register({
  'formats/svideo': Svideo,
  'formats/mvideo': Mvideo
});


class Editor extends Component {
  constructor(props) {
    super(props)
    this.quill = null;      // Quill instance
    this.reactQuill = null; // ReactQuill component
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
    if (typeof this.reactQuill.getEditor !== 'function') return;
    this.quill = this.reactQuill.getEditor()
    // this.quill.format('font', 'sofia')
     // respond to clicks inside the editor
     this.quill.root.addEventListener('click', this.handleClick, false)
    //  this.quill.root.quill = this.quill
  }
  
  insertText = () => {
    var range = this.quill.getSelection()
    let position = range ? range.index : 0
    this.quill.insertText(position, 'Hello, World! ')
  }

  getText = ()=>{
    const range = this.quill.getSelection()
    const position = range ? range.index : 0
    const text = this.quill.getText(position, 10)
    alert("10 characters from the current position: "+text)
  }

  formatText = ()=>{
    const range = this.quill.getSelection()
    const position = range ? range.index : 0
    const text = this.quill.formatText(position, 5, 'bold', true )
  }

  embedImage =()=>{
    const range = this.quill.getSelection()
    const position = range ? range.index : 0
    this.quill.insertEmbed(position, 'image', 'https://picsum.photos/200')
  }

  embedSmVideo =()=>{
    var range = this.quill.getSelection()
    console.log("range>>>", range)
    const position = range ? range.index : 0
    this.quill.insertEmbed(position, 'video', 'https://www.youtube.com/embed/QHH3iSeDBLo')
    this.quill.formatText(position, 1, { 'width': 200, 'height': 200 })
  }
  embedMdVideo =()=>{
    const range = this.quill.getSelection()
    console.log("range>>>", range)
    const position = range ? range.index : 0
    this.quill.insertEmbed(position, 'video', 'https://www.youtube.com/embed/QHH3iSeDBLo')
    this.quill.formatText(position, 1, { 'width': 400, 'height': 400 })
  }

  embedLgVideo =()=>{
    var range = this.quill.getSelection()
    console.log("range>>>", range)
    let position = range ? range.index : 0
    this.quill.insertEmbed(position, 'video', 'https://www.youtube.com/embed/QHH3iSeDBLo')
    this.quill.formatText(position, 1, { 'width': 600, 'height': 600 })
  }
  
  saveContents = ()=>{
    this.setState({
      deltas: this.quill.getContents()
    },()=>{
      console.log("this.state.deltas::", this.state.deltas)
    })
  }

  loadContents=()=>{
    this.quill.setContents(this.state.deltas)
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

  handleClick=(e)=>{
    console.log("e.target!", e.target)
  }

  getStateValue=()=>{
    console.log("this.state.value>>>",this.state.value)
  }

  render() {
    return (
      <div className="editor">
        <ReactQuill
          style={{ height: "500px" }}
          ref={(el) => { this.reactQuill = el }}
          modules={Editor.modules}
          formats={Editor.formats}
          placeHolder={"Add anything here..."}
          theme="bubble"
          value={this.state.value}
          onChange={this.handleTextChange}
          readOnly={this.state.readOnly}
        />
        <div className="button-panel">
          <button onClick={this.embedImage}>Embed an image</button>
          <button onClick={this.embedSmVideo}>Embed a Small video</button>
          <button onClick={this.embedMdVideo}>Embed a Medium video</button>
          <button onClick={this.embedLgVideo}>Embed a Large video</button>
          <button onClick={this.insertText}>Insert Text</button>
          <button onClick={this.formatText}>Format Text</button>
          <button onClick={this.getText}>Get Text</button>

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
    ['image', 'video', 'svideo', 'mvideo'],
    ['clean'],                                       // remove formatting
  ],
}

Editor.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'background',
  'list', 'bullet', 'indent', 'align',
  'size', 'color', 'font',
  'link', 'image', 'video', 'svideo', 'mvideo', 'width', 'height'
]


export default Editor
