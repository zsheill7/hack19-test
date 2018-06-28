import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import '../utils/dropzone.min.css';
import '../utils/filepicker.css';
import upload from 'superagent';
//require('superagent-proxy')(upload);

//const Dropzone = require('react-dropzone');

var componentConfig = {
  //iconFiletypes: ['.jpg', '.png', '.gif', '.obj'],
  //showFiletypeIcon: true,
  postUrl: '/uploadHandler'
};
var eventHandlers = {
  addedfile: file => {
    upload
      .post('/uploadHandler')
      .attach('theseNamesMustMatch', file)
      .end((err, res) => {
        if (err) console.log(err);
      });
  }
};

class Dropzone extends Component {
  onDrop(files) {}
  render() {
    return (
      <div style={{ height: '100px' }}>
        <DropzoneComponent
          config={componentConfig}
          eventHandlers={eventHandlers}
          //onDrop={this.onDrop.bind(this)}
        />
      </div>
    );
  }
}

export default Dropzone;
