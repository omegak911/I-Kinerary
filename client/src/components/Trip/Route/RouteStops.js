import React from 'react';
import RouteStopsLocation from './RouteStopsLocation';

const RouteStops = ({ route }) => {
  let { destination, origin, waypoints } = route;
  let mappedWaypoints = waypoints.map((waypoint, i) =>
    <RouteStopsLocation key={i} location={waypoint.location} />
  );

  return (
    <div>
      <RouteStopsLocation location={origin} />
      {mappedWaypoints}
      <RouteStopsLocation location={destination} />
      <button>+ on hover add stop</button>
    </div>
  )
};

export default RouteStops;