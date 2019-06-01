import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const RouteStopsLocation = ({ location, index }) =>
  <Draggable
    draggableId={`location.${index}`}
    index={index}
  >
    {(provided, snapshot) =>
      <StyledRouteStopsLocation
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        draggingOver={snapshot.draggingOver}
      >
      {location}
      </StyledRouteStopsLocation>
    }
  </Draggable>

const StyledRouteStopsLocation = styled.div`
  margin: 3px;
  border: 1px solid black;
`;

export default RouteStopsLocation;