import React from 'react';
import styled from 'styled-components';

import RouteStops from './RouteStops';
import Options from './Options';

const RouteContainer = ({ 
  route, 
  addDestination, 
  removeStop 
}) => 
  <StyledRouteContainer>
    <RouteStops 
      addDestination={addDestination} 
      removeStop={removeStop}
      route={route}
    /> 
    <div>Options</div>
  </StyledRouteContainer>

const StyledRouteContainer = styled.div`
  min-width: 300px;
`;

export default RouteContainer;