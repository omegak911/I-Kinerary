import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

class SearchPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryPlace: '',
      queryLocation: '',
      googlePlacesResults: []
    }
  }

  handleInput = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmission = (e) => {
    e.preventDefault();
    
    //query to Google Places API
    let { queryPlace, queryLocation } = this.state;
    axios
      .get(`/api/google/places?query=${queryPlace} near ${queryLocation}`)
      .then(data => console.log(data))
      .catch(err => console.error(err));
    // let googlePlacesResults = 'results from google places, format as needed'

    // let googlePlacesResults = [
    //   ...this.state.googlePlacesResults, 
    //   this.state.query
    // ];
    // this.setState({ googlePlacesResults, queryPlace: '', queryLocation: '' });
  }

  addDestination = (e) => {
    let { innerText } = e.target;

    this.setState({ 
      googlePlacesResults: [] }, 
      () => this.props.addDestination(innerText)
    );
  }

  render() {
    let { queryPlace, queryLocation, googlePlacesResults } = this.state;
    let results = googlePlacesResults.map((location, i) =>
      <StyledRouteStopsLocation key={i} onClick={this.addDestination}>
        {location}
      </StyledRouteStopsLocation>
    );

    return (
      <StyledForm 
        onSubmit={this.handleSubmission}
      >
        <StyledInput
          name="queryPlace"
          placeholder="add stop" 
          value={queryPlace}
          onChange={this.handleInput}
        />
        &nbsp;
        <div>near</div>
        &nbsp;
        <StyledInput 
          name="queryLocation"
          placeholder="location" 
          value={queryLocation}
          onChange={this.handleInput}
        />
        <button type="submit">search</button>
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
  display: flex;
  width: 98%;
`;

const StyledInput = styled.input`
  outline: none;
  border-style: none none inset none;
  padding: 3px;
  width: 40%;
`;

export default SearchPlaces;