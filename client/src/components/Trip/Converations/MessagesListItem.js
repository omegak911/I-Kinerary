import React from 'react';

const MessagesListItem = ({ message }) =>
  <div>
    <div>
    { message.username }: 
    { ' ' + message.message }
    </div>
    <hr/>
  </div>

export default MessagesListItem;