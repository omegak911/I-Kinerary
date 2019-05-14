import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyCenter: {
        lat: 34.0522,
        lng: -118.2437
      },
      lineCoordinates: null,
      directions: null
    }
  }

  componentDidMount() {
    this.handleMapLoad();
  }

  handleMapLoad = () => {
    const directionsService = new google.maps.DirectionsService();

    const calcAndDisplayRoute = (directionsService) => {
      directionsService.route({
        origin: 'Alhambra, CA',
        destination: 'Santa Barbara, CA',
        waypoints: [
          {
            location: 'Los Angeles, CA',
            stopover: true
          },
          {
            location: 'Santa Monica, CA',
            stopover: true
          }
        ],
        travelMode: google.maps.TravelMode.DRIVING
      }, (res, status) => {
        if (status === 'OK') {
          console.log(res)
          this.setState({ directions: res });
        } else {
          console.error('didnt work', res, status)
        }
      })
    }
    calcAndDisplayRoute(directionsService);
  }


  render() {
    let { dummyCenter, directions } = this.state;
    const GoogleMapContainer = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={ dummyCenter }
        defaultZoom={ 13 }
      >
        {directions && <DirectionsRenderer directions={directions}/>}
      </GoogleMap>
    ))

    return (
      <div>
        <GoogleMapContainer 
          containerElement={ <div style={{ height: '100vh', width: '100%' }}/>}
          mapElement={ <div style={{ height: '100%' }}/>}
        />
      </div>
    )
  }
}

export default Map;