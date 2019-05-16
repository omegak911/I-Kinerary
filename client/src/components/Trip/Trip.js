import React, { Component } from 'react';

class Trip extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    let { selectedTripId } = this.props;

    //AJAX request to get trip + route data
  }

  render() {
    return (
      <div>Trip
        basically all components other than TripList and TripListItem
      </div>
    )
  }
}

export default Trip;