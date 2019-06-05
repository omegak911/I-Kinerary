import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import RouteStopsLocation from './RouteStopsLocation';
import SearchPlaces from './SearchPlaces';

class RouteStops extends Component {
  shouldComponentUpdate(nextProps) {
    return !(nextProps.route === this.props.route);
  }

  render() {
    let { route, addDestination, removeStop } = this.props;
    let { destination, origin, waypoints } = route;
    let mappedWaypoints = waypoints.map((waypoint, i) =>
      <RouteStopsLocation 
        key={i + 1} index={i + 1}
        location={waypoint.location}
        removeStop={removeStop}
      />
    );

    return (
      <Droppable
        droppableId={route._id}
        type="routes"
      >
      {(provided, snapshot) => 
        <StyledRouteStops
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          <RouteStopsLocation
            key={0}
            index={0}
            location={origin}
            removeStop={removeStop}
          />

          {mappedWaypoints}

          <RouteStopsLocation
            key={waypoints.length + 1}
            index={waypoints.length + 1}
            location={destination}
            removeStop={removeStop}
          />
          
          {provided.placeholder}
          <SearchPlaces addDestination={addDestination}/>
        </StyledRouteStops>
      }
      </Droppable>
    )
  }
}

const StyledRouteStops = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  height: 95%;
  max-height: 350px;
`;

export default RouteStops;