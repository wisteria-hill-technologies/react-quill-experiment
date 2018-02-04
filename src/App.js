import React, { Component } from 'react';
import logo from './logo.svg';

import 'react-quill/dist/quill.snow.css'
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'

import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize);


class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null; // ReactQuill component
    this.state = {
      readOnly: false,
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
  }
  
  insertText = () => {
    var range = this.quillRef.getSelection();
    let position = range ? range.index : 0;
    this.quillRef.insertText(position, 'Hello, World! ')
  }
  
  getContents = ()=>{
    this.setState({
      deltas: this.quillRef.getContents()
    },()=>{
      console.log("this.state.deltas::", this.state.deltas)
    })
  }

  setContents=()=>{
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
      <div>
        <ReactQuill 
          ref={(el) => { this.reactQuillRef = el }}
          theme={'snow'} 
          modules={{ ...Editor.modules, imageResize:{}}}
          formats={Editor.formats}
          readOnly={this.state.readOnly}
          value={this.state.deltas}
        />
        <button onClick={this.insertText}>Insert Text</button>
        <button onClick={this.getContents}>get Deltas Contents Object</button>
        <button onClick={this.setContents}>set Deltas Contents Object</button>
        <button onClick={this.getStateValue}>get State Value(string)</button>
        <button onClick={this.toggleReadOnly}>Toggle ReadOnly</button>
      </div>
    )
  }
}

Editor.modules = {}
Editor.modules.toolbar = [
  ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
  ['blockquote', 'code-block'],                    // blocks
  [{ 'header': 1 }, { 'header': 2 }],              // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
  [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
  [{ 'direction': 'rtl' }],                        // text direction
  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
  [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
  [{ 'font': [] }],                                // font family
  [{ 'align': [] }],                               // text align
  ['image'],
  ['clean'],                                       // remove formatting
]

Editor.formats = [
  'header', 'font', 'background', 'color', 'code', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'script', 'align', 'direction',
  'link', 'image', 'code-block', 'formula', 'image', 'video'
]

export default Editor;
