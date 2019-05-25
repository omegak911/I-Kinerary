import React, { Component } from 'react';
import axios from 'axios'

class Trip extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    let { selectedTripId } = this.props;
    axios
      .get(`/api/route?trip_id=${selectedTripId}`)
      .then(({ data }) => console.log(data))
      .catch(err => console.error(err));
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