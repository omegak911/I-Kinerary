import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import axios from 'axios';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyCenter: {
        lat: 34.0522,
        lng: -118.2437
      },
      directions: null,
      request: null //we're not using this yet
    }
  }

  componentDidMount() {
    // this.getRouteData();
    let { route } = this.props;
    route.waypoints = route.waypoints.map(stop => {
      let { location, stopover } = stop;
      return { location, stopover };
    })
    this.handleMapLoad(route);
  }

  getRouteData = () => {
    axios
      .get(`/api/trip?id=${1}`)
      .then(({ data }) => {
        let { route } = data;
        delete route._id;
        delete route.trip_id;
        delete route.__v;
        route.waypoints = route.waypoints.map(stop => {
          let { location, stopover } = stop;
          return { location, stopover };
        })

        this.handleMapLoad(route);
      })
  }

  handleMapLoad = ({ origin, destination, travelMode, waypoints }) => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route({ origin, destination, travelMode, waypoints }, (res, status) => {
      if (status === 'OK') {
        console.log(res);
        this.setState({ directions: res });
      } else {
        console.error('didnt work', res, status)
      }
    })
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