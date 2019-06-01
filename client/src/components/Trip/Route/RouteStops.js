import React from 'react';
import RouteStopsLocation from './RouteStopsLocation';

const RouteStops = ({ route, placeholder }) => {
  console.log(route)
  let { destination, origin, waypoints, _id } = route;
  let mappedWaypoints = waypoints.map((waypoint, i) =>
    <RouteStopsLocation key={i} index={i + 2} location={waypoint.location} />
  );

  return (
    <div>
      <RouteStopsLocation location={origin} index={0} />
      {mappedWaypoints}
      <RouteStopsLocation location={destination} index={1} />
      {placeholder}
      <button>+ on hover add stop</button>
    </div>
  )
};

export default RouteStops;