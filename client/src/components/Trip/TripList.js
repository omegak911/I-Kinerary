import React, { Component } from 'react';
import axios from 'axios'

import TripListItem from './TripListItem';
;
class TripList extends Component {
  constructor(props){
    super(props);
    this.state = {
      trips: []
    }
  }

  componentDidMount() {
    //AJAX request to get all trips based on userId, we can hardcode this for now until we do auth
    //this should be done already from login
    //but for MVP, we'll leave this here
    axios
      .get(`/api/auth?username=Omegak911`)
      .then(({ data }) => {
        this.setState({ trips: data.trips });
      })
      .catch(() => console.log('err'));
  }

  render() {
    let trips = this.state.trips.map(trip => 
      <TripListItem 
        key={trip.id} 
        trip={trip}
        handleViewChange={this.props.handleViewChange}
        />
    )
    return (
      <div>TripList
        {trips}
        {/* <div onClick={() => handleViewChange(1)}>Hardcoded Trip</div>
        <div onClick={() => handleViewChange(1)}>Hardcoded Trip</div>
        <div onClick={() => handleViewChange(1)}>Hardcoded Trip</div>
        <div onClick={() => handleViewChange(1)}>Hardcoded Trip</div> */}
      </div>
    )
  }
}

export default TripList;