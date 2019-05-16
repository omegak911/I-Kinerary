import React, { Component } from 'react';

class TripList extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    //AJAX request to get all trips based on userId, we can hardcode this for now until we do auth
  }

  render() {
    let { handleViewChange } = this.props;
    return (
      <div>TripList
        <div onClick={() => handleViewChange('trip', 1)}>Hardcoded Trip</div>
        <div onClick={() => handleViewChange('trip', 1)}>Hardcoded Trip</div>
        <div onClick={() => handleViewChange('trip', 1)}>Hardcoded Trip</div>
        <div onClick={() => handleViewChange('trip', 1)}>Hardcoded Trip</div>
      </div>
    )
  }
}

export default TripList;