import { User, Bot, AlertCircle } from 'lucide-react';
import './ChatMessage.css';

function ChatMessage({ message }) {
  const isUser = message.sender === 'user';
  const isError = message.isError;

  return (
    <div className={`message ${isUser ? 'user-message' : 'ai-message'} ${isError ? 'error-message' : ''}`}>
      <div className="message-avatar">
        {isUser ? <User size={20} /> : isError ? <AlertCircle size={20} /> : <Bot size={20} />}
      </div>
      <div className="message-content">
        <div className="message-text">{message.text}</div>
      </div>
    </div>
  );
}

export default ChatMessage;
