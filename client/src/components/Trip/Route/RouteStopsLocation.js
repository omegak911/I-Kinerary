import React from 'react';
import styled from 'styled-components';

const RouteStopsLocation = ({ location }) =>
  <StyledRouteStopsLocation>
    {location}
    {/* if delete triggered, will show button to delete */}

    {/* this would get pushed to be smaller 
      location name
      - maybe details */}
  </StyledRouteStopsLocation>;

const StyledRouteStopsLocation = styled.div`
  margin: 3px;
  border: 1px solid black;
`;

export default RouteStopsLocation;