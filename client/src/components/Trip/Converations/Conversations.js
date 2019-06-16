import React, { Component } from 'react';

import MessagesList from './MessagesList';
import Form from './Form';

class Conversations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      comments: [],
      showComments: true,
    }
  }

  async componentDidMount() {
    await this.setState({ comments: this.props.comments });
    //set socket listeners for updating
    this.props.socket.on('server.sendMessage', ({ type, message, username }) => {
      type = type.toLowerCase();
      this.setState({ [type]: [...this.state[type], { message, username }] })
    })
  }

  sendMessage = (type, message) => {
    let { socket, trip_id } = this.props;
    let username = 'default' //get this from props once LOGIn is set
    socket.emit('client.sendMessage', 
      { 
        type, 
        message, 
        username,
        timestamp: new Date(),
        trip_id
      });
  }

  changeView = () => {
    this.setState({ showComments: !this.state.showComments })
  }

  render() {
    let { showComments } = this.state;
    let option = showComments ? 'Chats' : 'Comments';
    let type = showComments ? 'Comments' : 'Chats';
    let messages = this.state[type.toLowerCase()];

    return (
      <div>
        <button 
          type="button"
          onClick={this.changeView}>
            Switch to: {option}
        </button>
        <MessagesList messages={messages}/>
        <Form sendMessage={this.sendMessage} type={type}/>
      </div>
    )
  }
}

export default Conversations;