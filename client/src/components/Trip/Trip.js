import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import io from 'socket.io-client';
import { SOCKET_URL } from '../../../config/config';

import RouteContainer from './Route/RouteContainer';
import Map from './Map';
import Conversations from './Converations/Conversations';

class Trip extends Component {
  constructor(props){
    super(props);
    this.state = {
      route: null,
      routeLoaded: false,
      showMap: true,
      socket: null
    }
  }

  componentDidMount() {
    let { selectedTripId } = this.props;
    axios
      .get(`/api/route?trip_id=${selectedTripId}`)
      .then(({ data }) => 
        this.setState({ 
          route: data, 
          routeLoaded: true,
          socket: io(SOCKET_URL, { query: {
            roomId: data._id
          }})
        },
        this.socketRouteChangeHandler)
      )
      .catch(err => console.error(err));
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  socketRouteChangeHandler = () => {
    this.state.socket.on('server.updateRoute', (route) => {
      this.setState({ showMap: false }, () => {
        this.setState({ route, showMap: true });
      })
    })
  }

  updateRoute = (route) => {
    this.state.socket.emit('client.updateRoute', route);
  }

  addDestination = (destination) => { //always adds to the end
    let route = { ...this.state.route };
    destination.stopover = true;
    route.waypoints.push(destination);

    this.updateRoute(route);
  }

  removeStop = (index) => {
    let route = {...this.state.route};
    route.waypoints = [...route.waypoints];
    route.waypoints.splice(index, 1);

    this.updateRoute(route);
  }

  onDragEnd = (result) => {
    let { destination, source } = result;

    if (!destination || destination.index === source.index) return;
    
    let route = { ...this.state.route };
    route.waypoints = [...route.waypoints];
    route.waypoints.splice(destination.index, 0, route.waypoints.splice(source.index, 1)[0]);

    this.updateRoute(route);
  }

  renderView = () => {
    let { route, routeLoaded, showMap, socket } = this.state;
    let map = showMap ? 
      <Map route={route} /> 
      : 
      <div>Map Loading...</div>

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
{map}
              {/* <div style={{
                width: '70%',
                height: '60vh'
              }}>
              </div> */}
            </StyledTripTop>
            <Conversations socket={socket} trip_id={route.trip_id} comments={route.comments}/>
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