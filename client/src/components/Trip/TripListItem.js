import React from 'react';
import styled from 'styled-components';
import ClampLines from 'react-clamp-lines';
import moment from 'moment';

const TripListItem = ({ trip, handleViewChange }) => {
  let { id, title, description, start_date, end_date, stars } = trip;

  return (
    <StyledTripListItem onClick={() => handleViewChange(id)}>
      <h3>{title}</h3>
      <ClampLines 
        text={description}
        id={id}
        lines={1}
        innerElement="p"
      />
      <div>
        <div>start: {moment(start_date).format('MMMM Do YYYY')}</div>
        <div>end: {moment(end_date).format('MMMM Do YYYY')}</div>
        <div>stars: {stars}</div>
        
      </div>
    </StyledTripListItem>
  )
}

const StyledTripListItem = styled.div`
  border: 1px solid blue;
  margin: 5px;
  padding: 5px;
`

export default TripListItem;