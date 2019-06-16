import React from 'react';
import ChatListItem from './ChatListItem';

const ChatList = (props) => {
  let chats = props.chats.map((chat, i) =>
      <ChatListItem key={i} chat={chat}/>
    );

  console.log('ChatList chats: ', chats)

  return (
    <div>
      {chats}
    </div>
  )
}

export default ChatList;