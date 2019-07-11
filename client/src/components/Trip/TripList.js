import React, { Component } from 'react';

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
    let { trips } = this.props;
    this.setState({ trips });
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