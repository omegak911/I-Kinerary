import React, { Component } from 'react';
import styled from 'styled-components';

class SearchPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  handleInput = (e) => {
    this.setState({ query: e.target.value });
  }

  render() {
    let { query } = this.state;

    return (
      <StyledInput 
        placeholder="add stop" 
        value={query} 
        onChange={this.handleInput}
      />
    )
  }
}

const StyledInput = styled.input`
  outline: none;
  border-style: none none inset none;
  padding: 3px;
  width: 98%;
`;

export default SearchPlaces;