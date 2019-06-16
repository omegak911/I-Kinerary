import React, { Component } from 'react';

import ChatList from './ChatList';
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

  componentDidMount() {
    //set socket listeners for updating
    this.props.socket.on('server.sendMessage', ({ type, message, username }) => {
      type = type.toLowerCase();
      console.log(`type: ${type}, username: ${username}, message: ${message}`)
      this.setState({ [type]: [...this.state[type], { message, username }] })
    })
  }

  sendMessage = (type, message) => {
    let username = 'default' //get this from props once LOGIn is set
    this.props.socket.emit('client.sendMessage', { type, message, username });
  }

  changeView = () => {
    this.setState({ showComments: !this.state.showComments })
  }

  renderView = () => {
    let { chats, comments, showComments } = this.state;
    return showComments ? <div>Comments</div> : <ChatList chats={chats}/>
  }

  render() {
    let { showComments } = this.state;
    let option = showComments ? 'Chats' : 'Comments';
    let type = showComments ? 'Comments' : 'Chats';

    return (
      <div>
        <button 
          type="button"
          onClick={this.changeView}>
            Switch to: {option}
        </button>
        {this.renderView()}
        <Form sendMessage={this.sendMessage} type={type}/>
      </div>
    )
  }
}

export default Conversations;