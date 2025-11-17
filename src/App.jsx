import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Sidebar from './components/Sidebar';
import { generateAIResponse } from './utils/aiResponses';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(message),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="app">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
      />
      
      <div className="main-content">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <div className="chat-container">
          {messages.length === 0 ? (
            <div className="welcome-screen">
              <h1>Tafita AI</h1>
              <p>How can I help you today?</p>
              <div className="example-prompts">
                <button onClick={() => handleSendMessage("What is artificial intelligence?")}>
                  What is artificial intelligence?
                </button>
                <button onClick={() => handleSendMessage("Explain quantum computing")}>
                  Explain quantum computing
                </button>
                <button onClick={() => handleSendMessage("Write a poem about nature")}>
                  Write a poem about nature
                </button>
              </div>
            </div>
          ) : (
            <div className="messages">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="loading-message">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

export default App;
