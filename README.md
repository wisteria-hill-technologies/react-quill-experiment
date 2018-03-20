# React-Quill Integration
This is a simple experiment to learn how to use React Quill Editor and expand it with other functionalities such as video and image resizing.

With React-Quill, you can save the value of the editor either as a HTML string or Delta (object).
To integrate quill-image-module, it is important to do the following to make it work.

```
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize);
```

In webpack config file, add the plugin.
```
plugins: [
    new webpack.ProvidePlugin({
      'window.Quill': 'quill'
      }),
    ... ]
```
Also, add 'width' to Editor.formats.

Check App.js for the example.

Another test:
```
https://codepen.io/nfabacus/pen/Ldxomy
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).