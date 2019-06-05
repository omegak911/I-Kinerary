import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const RouteStopsLocation = ({ location, index, removeStop }) =>
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
      <StyledLocationName>
        {location}
      </StyledLocationName>
      <StyledRemoveLocation onClick={() => removeStop(index)} title="remove stop">
        ×
      </StyledRemoveLocation>
      </StyledRouteStopsLocation>
    }
  </Draggable>

const StyledRemoveLocation = styled.div`
  display: none;
  cursor: pointer;
`;

const StyledRouteStopsLocation = styled.div`
  border: 1px solid black;
  margin: 3px;
  padding: 3px;
  width: 97%;
  display: flex;
  &:hover ${StyledRemoveLocation} {
    display: block;
  }
`;

const StyledLocationName = styled.div`
  width: 90%;
`;

export default RouteStopsLocation;