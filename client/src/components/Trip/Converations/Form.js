import React, { useState } from 'react';

const Form = ({ sendMessage, type }) => {
  const [message, updateMessage] = useState('');

  const handleInputChange = (e) => {
    updateMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(type, message);
    updateMessage('');
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}/>
      <button type="submit">send</button>
    </form>
  )
}

export default Form;