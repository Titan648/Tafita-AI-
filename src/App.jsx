import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Sidebar from './components/Sidebar';
import { sendMessageToGroq } from './services/groqService';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState(null);
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
    setError(null);

    try {
      // Send message to Groq with conversation history
      const aiResponseText = await sendMessageToGroq(message, messages);

      const aiResponse = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      
      let errorMessage = 'Sorry, I encountered an error. ';
      
      if (error.message.includes('API key')) {
        errorMessage += 'Please configure your Groq API key in the .env file.';
      } else if (error.message.includes('rate limit')) {
        errorMessage += 'Rate limit reached. Please try again in a moment.';
      } else {
        errorMessage += 'Please try again.';
      }

      setError(errorMessage);

      const errorResponse = {
        id: Date.now() + 1,
        text: errorMessage,
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setError(null);
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
              <p>Powered by Groq - Lightning Fast AI</p>
              <div className="example-prompts">
                <button onClick={() => handleSendMessage("What is artificial intelligence?")}>
                  What is artificial intelligence?
                </button>
                <button onClick={() => handleSendMessage("Explain quantum computing in simple terms")}>
                  Explain quantum computing in simple terms
                </button>
                <button onClick={() => handleSendMessage("Write a short poem about technology")}>
                  Write a short poem about technology
                </button>
                <button onClick={() => handleSendMessage("Help me learn React")}>
                  Help me learn React
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
                  <span className="loading-text">Tafita is thinking...</span>
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
