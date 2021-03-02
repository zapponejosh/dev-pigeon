import { useState } from 'react';

const MessageInput = ({ onSubmit }) => {
  const [messageText, setMessageText] = useState('');

  const submitOnEnter = (event) => {
    // Watch for enter key

    if (event.key === 'Enter' && messageText.trim().length > 0) {
      onSubmit(messageText);
      setMessageText('');
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="pigeons await..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => submitOnEnter(e)}
      />
    </>
  );
};

export default MessageInput;
