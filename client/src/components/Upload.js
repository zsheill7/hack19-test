import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from './Dropzone';

class Upload extends Component {
  render() {
    return (
      <div>
        <Dropzone />
      </div>
    );
  }
}

export default Upload;
