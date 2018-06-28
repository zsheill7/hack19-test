import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dropzone extends Component {
  handleFinishedUpload = info => {
    console.log('File uploaded with filename', info.filename);
    console.log('Access it on s3 at', info.fileUrl);
  };

  render() {
    const uploadOptions = {
      server: 'http://localhost:5000',
      signingUrlQueryParams: { uploadType: 'avatar' }
    };

    const s3Url = 'https://webuploadtest1.s3.amazonaws.com';

    return (
      <DropzoneS3Uploader
        onFinish={this.handleFinishedUpload}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
      />
    );
  }
}

export default Dropzone;

/*import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import '../utils/dropzone.min.css';

var componentConfig = {
  iconFiletypes: ['.jpg', '.png', '.gif', '.obj'],
  showFiletypeIcon: true,
  postUrl: '/uploadHandler'
};
var djsConfig = { autoProcessQueue: false };

class Dropzone extends Component {
  render() {
    return (
      <div style={{ height: '100px' }}>
        <DropzoneComponent
          config={componentConfig}
          djsConfig={djsConfig}
          eventHandlers={this.eventHandlers.bind(this)}
        />
      </div>
    );
  }

  eventHandlers(file, done) {
    lambda
      .getSignedURL(file)
      .then(url => {
        file.uploadURL = url;
        done();
        // And process each file immediately
        setTimeout(() => dropzone.processFile(file));
      })
      .catch(err => {
        done('Failed to get an S3 signed upload URL', err);
      });
    dropzone.on('processing', file => {
      dropzone.options.url = file.uploadURL;
    });
    return file;
  }
}

export default Dropzone;*/
