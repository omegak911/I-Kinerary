import React from 'react';
import axios from 'axios';

const Options = ({ route }) => {

  const saveRoute = () => {
    let { trip_id, waypoints, travelMode } = route;
    let options = {
      travelMode,
      waypoints
    }
    axios
      .patch('/api/route', { trip_id, options })
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  return (
    <div>
      optimize
      <button type="button" onClick={saveRoute}>save</button>
    </div>
  )
}

export default Options;