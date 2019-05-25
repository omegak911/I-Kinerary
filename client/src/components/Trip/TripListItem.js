import React from 'react';

const TripListItem = ({ trip, handleViewChange }) => {
  let { id, title, description, start_date, end_date, stars } = trip;
  return (
    <div onClick={() => handleViewChange(id)}>
      <h5>{title}</h5>
      <p>{description}</p>
      <div>
        <span>start: {start_date}</span>
        <span>end: {end_date}</span>
        <span>stars: {stars}</span>
      </div>
    </div>
  )
}

export default TripListItem;