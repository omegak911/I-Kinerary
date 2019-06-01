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
  border: 1px solid black;
  margin: 3px;
  padding: 3px;
  width: 97%;
`;

export default RouteStopsLocation;