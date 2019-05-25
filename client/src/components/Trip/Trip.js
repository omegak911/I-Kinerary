import React, { Component } from 'react';
import axios from 'axios';

import RouteContainer from './Route/RouteContainer';
import Map from './Map';
import Conversations from './Converations/Conversations';

class Trip extends Component {
  constructor(props){
    super(props);
    this.state = {
      route: null,
      routeLoaded: false
    }
  }

  componentDidMount() {
    let { selectedTripId } = this.props;
    axios
      .get(`/api/route?trip_id=${selectedTripId}`)
      .then(({ data }) => this.setState({ route: data, routeLoaded: true }))
      .catch(err => console.error(err));
  }

  renderView = () => {
    let { route, routeLoaded } = this.state;
    if (routeLoaded) {
      return (<div>
        <RouteContainer />
        <Map route={route} />
        <Conversations />
      </div>)
    } else {
      return <div>Loading...</div>
    }
  }

  render() {
    return this.renderView();
  }
}

export default Trip;