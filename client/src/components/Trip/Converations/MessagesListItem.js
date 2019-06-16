import React from 'react';

const MessagesListItem = ({ message }) =>
  <div>
    <div>
      username: { message.username }
    </div>
    <div>
      { message.message }
    </div>
  </div>

export default MessagesListItem;