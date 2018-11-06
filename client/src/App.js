import React, {Component} from 'react';
import axios from 'axios';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class App extends Component {
  state = {
    currentPage: 'camera',
    otherPage: 'gallery',
  };

  changePage = () => {
    this.setState({
      currentPage: this.state.otherPage,
      otherPage: this.state.currentPage,
    });
  };

  getPhotos() {
    axios
      .get('/api/gallery')
      .then(
        ({data: photos}) => (
          console.log(photos, ' are photos'), this.setState({photos})
        ),
      )
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getPhotos();
  }
  onTakePhoto(dataUri) {
    // Do stuff with the dataUri photo...
    axios.post('/api/photo', {dataUri});
    this.getPhotos();
  }

  render() {
    return (
      <div className="App">
        <p style={{fontSize: '40px'}}>
          Go to{' '}
          <a
            style={{
              color: 'blue',
              textDecoration: 'underline',
              fontSize: '40px',
            }}
            onClick={this.changePage}>
            {this.state.otherPage}
          </a>
        </p>
        {this.state.currentPage === 'camera' ? (
          <Camera
            onTakePhoto={dataUri => {
              this.onTakePhoto(dataUri);
            }}
          />
        ) : (
          <div>
            {this.state.photos ? (
              this.state.photos.map(photo => <img src={photo.dataUri} />)
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
