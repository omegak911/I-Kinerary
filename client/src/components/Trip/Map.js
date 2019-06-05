import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import axios from 'axios';
import styled from 'styled-components';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyCenter: {
        lat: 34.0522,
        lng: -118.2437
      }
    }
  }

  componentDidMount() {
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

  handleMapLoad = ({ 
    destination,
    origin,
    travelMode,
    waypoints
  }) => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route({ 
      destination,
      origin,
      travelMode,
      waypoints
    }, (res, status) => {
      if (status === 'OK') {
        this.setState({ directions: res });
      } else {
        //we could setState some error to be displayed
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
        {directions && 
          <DirectionsRenderer 
            directions={directions}
          />
        }
      </GoogleMap>
    ))

    return (
      <StyledMapWrapper>
        <GoogleMapContainer 
          containerElement={ 
            <div style={{ 
              height: '60vh', 
              width: '100%' 
            }}/>
          }
          mapElement={ 
            <div style={{ 
              height: '100%' 
            }}/>
          }
        />
      </StyledMapWrapper>
    )
  }
}

const StyledMapWrapper = styled.div`
  width: 70%;
`;

export default Map;