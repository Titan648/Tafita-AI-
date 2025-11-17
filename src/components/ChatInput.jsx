import { useState } from 'react';
import { Send } from 'lucide-react';
import './ChatInput.css';

function ChatInput({ onSendMessage, disabled }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="chat-input-form">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message to Tafita AI..."
          disabled={disabled}
          rows={1}
        />
        <button type="submit" disabled={disabled || !input.trim()}>
          <Send size={20} />
        </button>
      </form>
      <p className="chat-input-disclaimer">
        Tafita AI can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}

export default ChatInput;
