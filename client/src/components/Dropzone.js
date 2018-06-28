import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import '../utils/dropzone.min.css';
import upload from 'superagent';

//const Dropzone = require('react-dropzone');

var componentConfig = {
  //iconFiletypes: ['.jpg', '.png', '.gif', '.obj'],
  //showFiletypeIcon: true,
  postUrl: '/uploadHandler'
};
var djsConfig = { autoProcessQueue: false };
var eventHandlers = { addedfile: file => console.log(file) };

class Dropzone extends Component {
  onDrop(files) {
    upload
      .post('/uploadHandler')
      .attach('theseNamesMustMatch', files[0])
      .end((err, res) => {
        if (err) console.log(err);
        alert('File uploaded!');
      });
  }
  render() {
    return (
      <div style={{ height: '100px' }}>
        <DropzoneComponent
          config={componentConfig}
          //djsConfig={djsConfig}
          eventHandlers={this.onDrop.bind(this)}
          //onDrop={this.onDrop.bind(this)}
        />
      </div>
    );
  }
}

export default Dropzone;
