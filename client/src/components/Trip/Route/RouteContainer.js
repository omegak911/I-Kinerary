import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import RouteStops from './RouteStops';
import Options from './Options';

const RouteContainer = ({ route }) => 
  <Droppable
    droppableId={route._id}
    type="routes"
  >
  {(provided, snapshot) => 
    <StyledRouteContainer
      ref={provided.innerRef}
      {...provided.droppableProps}
      isDraggingOver={snapshot.isDraggingOver}
    >
      <RouteStops route={route} placeholder={provided.placeholder}/>
      <div>Options</div>
    </StyledRouteContainer>
  }
  </Droppable>

const StyledRouteContainer = styled.div`
  min-width: 300px;
`;

export default RouteContainer;