import React, { useState } from 'react';

const Conversations = (props) => {
  const [showComments, changeView] = useState(true);
  
  return (
    <div>
      <button 
        type="button" 
        onClick={() => changeView(!showComments)}>
          Switch to: {showComments ? 'Chat' : 'Comments'}
      </button>
      {showComments ? <div>Comments</div> : <div>Chat</div>}
    </div>
    )
}

export default Conversations;