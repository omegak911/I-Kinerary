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
      routeLoaded: false,
      showMap: true
    }
  }

  componentDidMount() {
    let { selectedTripId } = this.props;
    axios
      .get(`/api/route?trip_id=${selectedTripId}`)
      .then(({ data }) => 
        this.setState({ 
          route: data, 
          routeLoaded: true 
        })
      )
      .catch(err => console.error(err));
  }

  addDestination = (destination) => { //always adds to the end
    let route = { ...this.state.route };
    // route.waypoints = [...route.waypoints]; //probably don't need a new array for waypoints as well
    route.waypoints.push({
      location: route.destination,
      stopover: true
    });

    route.destination = destination;
    // this.setState({ route });
    this.setState({ showMap: false }, () => {
      this.setState({ route, showMap: true });
    })
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

  removeStop = (index) => { //need to test to ensure index matches
    let route = {...this.state.route};
    let routeArr = this.convertRouteObjectToArray(route);
    routeArr.splice(index, 1);
    route = this.seedArrayToRouteObject(routeArr, route);

    this.setState({ showMap: false }, () => {
      this.setState({ route, showMap: true });
    });
  }

  onDragEnd = (result) => {
    let { destination, source } = result;

    if (!destination || destination.index === source.index) return;
    
    let route = { ...this.state.route };
    let routeArr = this.convertRouteObjectToArray(route);
    routeArr.splice(destination.index, 0, routeArr.splice(source.index, 1)[0]);
    route = this.seedArrayToRouteObject(routeArr, route);

    this.setState({ showMap: false }, () => {
      this.setState({ route, showMap: true });
    })
  }

  renderView = () => {
    let { route, routeLoaded, showMap } = this.state;
    // let map = showMap ? 
    //   <Map route={route} /> 
    //   : 
    //   <div>Map Loading...</div>

    if (routeLoaded) {
      return (
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          <div>
            <StyledTripTop>
              <RouteContainer 
                addDestination={this.addDestination}
                removeStop={this.removeStop}
                route={route}
              />
{/* {map} */}
              <div style={{
                width: '70%',
                height: '60vh'
              }}>
{/*  */}
              </div>
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