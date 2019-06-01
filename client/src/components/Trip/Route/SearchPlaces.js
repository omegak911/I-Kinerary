import React, { Component } from 'react';
import styled from 'styled-components';

class SearchPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      googlePlacesResults: []
    }
  }

  handleInput = (e) => {
    this.setState({ query: e.target.value });
  }

  handleSubmission = (e) => {
    e.preventDefault();
    
    //query to Google Places API
    let googlePlacesResults = [...this.state.googlePlacesResults, this.state.query];
    this.setState({ googlePlacesResults, query: '' });
  }

  render() {
    let { query, googlePlacesResults } = this.state;
    let results = googlePlacesResults.map((location, i) =>
      <StyledRouteStopsLocation key={i}>
        {location}
      </StyledRouteStopsLocation>
    );

    return (
      <StyledForm 
        onSubmit={this.handleSubmission}
      >
        <StyledInput 
          placeholder="add stop" 
          value={query} 
          onChange={this.handleInput}
        />
        {results}
      </StyledForm>
    )
  }
}

const StyledRouteStopsLocation = styled.div`
  border: 1px solid black;
  margin: 3px;
  padding: 3px;
  width: 97%;
`;

const StyledForm = styled.form`
  width: 98%;
`;

const StyledInput = styled.input`
  outline: none;
  border-style: none none inset none;
  padding: 3px;
  width: 100%;
`;

export default SearchPlaces;