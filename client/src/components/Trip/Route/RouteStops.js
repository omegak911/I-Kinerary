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
    let mappedWaypoints = route.waypoints.map((waypoint, i) =>
      <RouteStopsLocation 
        key={i} index={i}
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
          {mappedWaypoints}
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