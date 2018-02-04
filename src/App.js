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
      value: `<p class="ql-align-center"><img src="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAMMOAADDDgAAAAAAAAAAAAD///////////////////////////r5+f/l4+L/5+bm/+/v7//3+Pj//f39//////////////////////////////////////////////////7+/v/18/L/4d7d/9bW2P/T1Nb/2NjZ/+Df4P/y8vL////////////////////////////////////////////8+/v/9PHv/+Dd3f/M1OH/xdHj/8PP4v/Hztr/5OXo/////////////////////////////////////////////Pv7//Pw7//b2tv/0dTb/8zU4f/F0ub/xNHl/+Di5v////////////////////////////////////////////b09P/v7Ov/3dvc/9rY2P/Z19f/2NfY/9XV1//g4OH//Pz8//////////////////////////////////7+/v/n5OP/1dLR/8bFxv/Ozc7/1tTV/8jGxv/Sz9D/3Nrb/+Xk5P/8/Pz////////////////////////////9/Pz/7Ono/+Dd3P/Bv8D/tLO0/7Gxsv+rqrP/uLa6/8XDxP/JyMn/4+Pk//b29v///////////////////////Pz8/+jm5P/g3dz/0M3M/6Genv+dnJz/qqfS/7CuxP+ioaH/ubm6/+Dg4P/4+Pj///////////////////////7+/f/7+Pb/9/Py/+Xh4P/Gw8L/v7y8/9vY2//U0dL/lpOU/8bExf/e3t7/7+/v///////////////////////+/f3/+/j2//z7+f/39/b/9fT0//Ty8v/v7e3/6+no/+Ti4v/k4eH/9fT0/////////////////////////////fz8//Hs8f/w6/T//Pz8///////r7O//5eXq//Ly9P/+/v7//f39//7+/v////////////////////////////z8+//i1uj/2srn//r5+P//////pKi1/5eOsv+zscb//f79///////////////////////////////////////8+/r/49bp/9vL6P/6+fn//////6Cls/+VirP/qqfA//v8/P///////////////////////////////////////Pv6/+PW6f/dzen/+/r5//////+kqbb/lYuy/6ilwP/5+vr///////////////////////////////////////z6+f/j1er/3s/q//v6+v//////p6y5/5OJsP+nor//9/j4///////////////////////////////////////8+/r/7ubw/+zj8P/8/Pv//////73BzP+YlrL/ra3C//j4+f//////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==" width="201" style="cursor: nwse-resize;"></p>`,
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
      <div>
        <ReactQuill 
          ref={(el) => { this.reactQuillRef = el }}
          theme={'snow'} 
          modules={{ ...Editor.modules, imageResize:{}}}
          formats={Editor.formats}
          readOnly={this.state.readOnly}
          onChange={this.handleTextChange}
          // value={this.state.deltas}
          value={this.state.value}
        />
        <button onClick={this.insertText}>Insert Text</button>
        <button onClick={this.saveContents}>save Deltas Contents Object</button>
        <button onClick={this.loadContents}>load Deltas Contents Object</button>
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
  'link', 'image', 'code-block', 'formula', 'image', 'video', 'width'
]

export default Editor;
