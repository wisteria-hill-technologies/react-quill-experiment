import { Quill } from 'react-quill'
const BlockEmbed = Quill.import('blots/block/embed');

class Svideo extends BlockEmbed {
  static create(value) {
    let node = super.create(value);
    let iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', true);
    iframe.setAttribute('src', value);
    iframe.setAttribute('width', 200)
    iframe.setAttribute('height', 200)
    node.appendChild(iframe);
    return node;
  }

  // static value(domNode) {
  //   console.log("domNode>>>", domNode.firstChild.tagName)
  //   if (domNode.firstChild.tagName==="IFRAME") {
  //     return domNode.firstChild.getAttribute('src')
  //   } else {
  //     return ""
  //   }
  // }
}
Svideo.blotName = 'svideo';
Svideo.className = 'ql-video';
Svideo.tagName = 'div';



class Mvideo extends BlockEmbed {
  static create(value) {
    let node = super.create(value);
    let iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', true);
    iframe.setAttribute('src', value);
    iframe.setAttribute('width', 800)
    iframe.setAttribute('height', 500)
    node.appendChild(iframe);
    return node;
  }

  // static value(domNode) {
  //   return domNode&&domNode.firstChild?domNode.firstChild.getAttribute('src'):""
  // }
}
Mvideo.blotName = 'mvideo';
Mvideo.className = 'ql-video';
Mvideo.tagName = 'div';


export { Svideo, Mvideo }





