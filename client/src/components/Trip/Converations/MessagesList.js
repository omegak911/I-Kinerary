import React from 'react';
import MessagesListItem from './MessagesListItem';

const ChatList = (props) => {
  let messages = props.messages.map((message, i) =>
      <MessagesListItem key={i} message={message}/>
    );

  return (
    <div>
      {messages}
    </div>
  )
}

export default ChatList;