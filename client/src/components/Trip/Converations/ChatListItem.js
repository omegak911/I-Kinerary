import React from 'react';

const ChatListItem = ({ chat }) =>
  <div>
    <div>
      { chat.username }
    </div>
    <div>
      { chat.message }
    </div>
  </div>

export default ChatListItem;