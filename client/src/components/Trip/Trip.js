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
          socket: this.establishSocket(data._id)
        })
      )
      .catch(err => console.error(err));
  }

  establishSocket = async (roomId) => {
    let socket = await io(SOCKET_URL, { query: {
      roomId: roomId
    }})

    // socket.emit('client.updateRoute', 'test')    
    await socket.on('server.updateRoute', () => {
      console.log(`client received msg from server`)
    })

    return socket;
  }

  addDestination = (destination) => { //always adds to the end
    let route = { ...this.state.route };
    destination.stopover = true;
    route.waypoints.push(destination);
      
    this.setState({ showMap: false }, () => {
      this.setState({ route, showMap: true });
    })
  }

  removeStop = (index) => { 
    //need to test to see if directions API will work without a destination
    //aka, only have 1
    let route = {...this.state.route};
    route.waypoints = [...route.waypoints];
    route.waypoints.splice(index, 1);

    this.setState({ showMap: false }, () => {
      this.setState({ route, showMap: true });
    });
  }

  onDragEnd = (result) => {
    let { destination, source } = result;

    if (!destination || destination.index === source.index) return;
    
    let route = { ...this.state.route };
    route.waypoints = [...route.waypoints];
    route.waypoints.splice(destination.index, 0, route.waypoints.splice(source.index, 1)[0]);

    this.setState({ showMap: false }, () => {
      this.setState({ route, showMap: true });
    })
  }

  renderView = () => {
    let { route, routeLoaded, showMap } = this.state;
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