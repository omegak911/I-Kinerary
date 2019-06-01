import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import RouteStopsLocation from './RouteStopsLocation';

class RouteStops extends Component {
  shouldComponentUpdate(nextProps) {
    return !(nextProps.route === this.props.route);
  }

  render() {
    let { route } = this.props;
    let { destination, origin, waypoints } = route;
    let mappedWaypoints = waypoints.map((waypoint, i) =>
      <RouteStopsLocation key={i} index={i + 1} location={waypoint.location} />
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
          <RouteStopsLocation location={origin} index={0} />
          {mappedWaypoints}
          <RouteStopsLocation location={destination} index={waypoints.length + 1} />
          {provided.placeholder}
          <StyledButton title="add stop">+</StyledButton>
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
`;

const StyledButton = styled.button`
  width: 98%;
`

export default RouteStops;