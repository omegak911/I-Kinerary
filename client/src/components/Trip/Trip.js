import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import RouteContainer from './Route/RouteContainer';
import Map from './Map';
import Conversations from './Converations/Conversations';

class Trip extends Component {
  constructor(props){
    super(props);
    this.state = {
      route: null,
      routeLoaded: false
    }
  }

  componentDidMount() {
    let { selectedTripId } = this.props;
    axios
      .get(`/api/route?trip_id=${selectedTripId}`)
      .then(({ data }) => this.setState({ route: data, routeLoaded: true }))
      .catch(err => console.error(err));
  }

  convertRouteObjectToArray = (routeObj) => {
    let routeArr = [routeObj.origin]

    for (let stop of routeObj.waypoints) {
      routeArr.push(stop.location);
    }
    routeArr.push(routeObj.destination);

    return routeArr;
  }

  seedArrayToRouteObject = (routeArr, routeObj) => {
    let from = routeArr[0];
    let waypoints = [];
    let to = routeArr[routeArr.length - 1];

    for (let i = 1; i < routeArr.length - 1; i++) {
      waypoints.push({
        location: routeArr[i],
        stopover: true
      });
    }

    routeObj.origin = from;
    routeObj.waypoints = waypoints;
    routeObj.destination = to;

    return routeObj;
  }

  onDragEnd = (result) => {
    let { destination, source } = result;

    if (!destination || destination.index === source.index) return;
    
    let route = { ...this.state.route };
    let routeArr = this.convertRouteObjectToArray(route);
    routeArr.splice(destination.index, 0, routeArr.splice(source.index, 1));

    route = this.seedArrayToRouteObject(routeArr, route);

    this.setState({ route });
  }

  renderView = () => {
    let { route, routeLoaded } = this.state;

    if (routeLoaded) {
      return (
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          <div>
            <StyledTripTop>
              <RouteContainer route={route} />
              <Map route={route} />
            </StyledTripTop>
            <Conversations />
          </div>
        </DragDropContext>
      )
    } else {
      return <div>Loading...</div>
    }
  }

  render() {
    return this.renderView();
  }
}

const StyledTripTop = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
`;

export default Trip;