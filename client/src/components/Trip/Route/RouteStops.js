import React, { Component } from 'react';
import RouteStopsLocation from './RouteStopsLocation';

class RouteStops extends Component {
  shouldComponentUpdate(nextProps) {
    return !(nextProps.route === this.props.route);
  }

  render() {
    let { route, placeholder } = this.props;
    let { destination, origin, waypoints } = route;
    let mappedWaypoints = waypoints.map((waypoint, i) =>
      <RouteStopsLocation key={i} index={i + 1} location={waypoint.location} />
    );

    return (
      <div>
        <RouteStopsLocation location={origin} index={0} />
        {mappedWaypoints}
        <RouteStopsLocation location={destination} index={waypoints.length + 1} />
        {placeholder}
        <button>+ on hover add stop</button>
      </div>
    )
  }
}
export default RouteStops;