import React from 'react';

const MessagesListItem = ({ message }) =>
  <div>
    <div>
      { message.username }
    </div>
    <div>
      { message.message }
    </div>
  </div>

export default MessagesListItem;