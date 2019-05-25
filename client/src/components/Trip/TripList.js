import React, { Component } from 'react';
import axios from 'axios'

import TripListItem from './TripListItem';
;
class TripList extends Component {
  constructor(props){
    super(props);
    this.state = {
      trips: [],
      numberOfTripsDisplayed: 5
    }
  }

  componentDidMount() {
    //AJAX request to get all trips based on userId, we can hardcode this for now until we do auth
    //this should be done already from login
    //but for MVP, we'll leave this here
    axios
      .get(`/api/auth?username=Omegak911`)
      .then(({ data }) => this.setState({ trips: data.trips }))
      .catch(() => console.log('err'));
  }

  increasedDisplayedTrips = () => {
    this.setState({ numberOfTripsDisplayed: this.state.numberOfTripsDisplayed + 5})
  }

  render() {
    let trips = this.state.trips.map((trip , i) => {
      if (i < this.state.numberOfTripsDisplayed) {
        return <TripListItem 
          key={trip.id} 
          trip={trip}
          handleViewChange={this.props.handleViewChange}
          />
      }
    })

    return (
      <div>TripList
        {trips}
        <button onClick={this.increasedDisplayedTrips}>Show more</button>
      </div>
    )
  }
}

export default TripList;