import React from 'react';
import styled from 'styled-components';
import MessagesListItem from './MessagesListItem';

const MessageList = (props) => {
  let messages = props.messages.map((message, i) =>
      <MessagesListItem key={i} message={message}/>
    );
  messages.reverse();

  return (
    <StyledMessageList>
      {messages}
    </StyledMessageList>
  )
}

const StyledMessageList = styled.div`
  border: 1px solid black;
  height: 100px;
  overflow: scroll;
  resize: vertical;
`;

export default MessageList;