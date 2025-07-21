import React, { useState, useRef, useEffect } from 'react';

function ChatbotInterface({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Function to handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user"
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    
    // Simulate sending to n8n and getting a response
    setTimeout(() => {
      handleN8nResponse(inputValue);
    }, 1000);
  };
  
  // Function to handle n8n response
  const handleN8nResponse = async (userMessage) => {
    // Show typing indicator
    const typingIndicatorId = messages.length + 2;
    setMessages(prevMessages => [
      ...prevMessages,
      { id: typingIndicatorId, text: "...", sender: "bot", isTyping: true }
    ]);
    
    try {
      // This is where you would integrate with n8n
      // Replace 'YOUR_N8N_WEBHOOK_URL' with your actual n8n webhook URL
      
      // For development/demo, we'll use a simulated response
      // In production, uncomment the fetch code below and use your actual n8n webhook
      
      /*
      const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          userId: 'user-' + Math.random().toString(36).substr(2, 9), // Generate a random user ID
        }),
      });
      
      const data = await response.json();
      const botResponse = data.response;
      */
      
      // Simulated response (remove this in production)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      let botResponse = "I'm sorry, I don't understand that. Could you please rephrase?";
      
      // Simple response logic (to be replaced with actual n8n response)
      if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
        botResponse = "Hello there! How can I assist you with Fore Coffee today?";
      } else if (userMessage.toLowerCase().includes('menu')) {
        botResponse = "We offer a variety of coffee drinks, from espresso to our signature beverages. Would you like to see our full menu?";
      } else if (userMessage.toLowerCase().includes('location') || userMessage.toLowerCase().includes('store')) {
        botResponse = "We have multiple locations throughout Indonesia. Could you specify which area you're interested in?";
      } else if (userMessage.toLowerCase().includes('hours') || userMessage.toLowerCase().includes('open')) {
        botResponse = "Most of our stores are open from 7 AM to 9 PM daily, but specific hours may vary by location.";
      }
      // Remove typing indicator and add actual response
      setMessages(prevMessages =>
        prevMessages
          .filter(msg => msg.id !== typingIndicatorId)
          .concat({
            id: messages.length + 3,
            text: botResponse,
            sender: "bot"
          })
      );
    } catch (error) {
      console.error('Error communicating with n8n:', error);
      
      // Remove typing indicator and add error message
      setMessages(prevMessages =>
        prevMessages
          .filter(msg => msg.id !== typingIndicatorId)
          .concat({
            id: messages.length + 3,
            text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later.",
            sender: "bot"
          })
      );
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-title">Fore Coffee Assistant</div>
        <button className="chatbot-close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="chatbot-messages">
        {messages.map(message => (
          <div
            key={message.id}
            className={`message ${message.sender === "bot" ? "bot-message" : "user-message"} ${message.isTyping ? "typing" : ""}`}
          >
            {message.isTyping ? (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              message.text
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chatbot-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="chatbot-input"
        />
        <button type="submit" className="chatbot-send-btn">Send</button>
      </form>
      
      <div className="chatbot-footer">
        <p>Powered by n8n</p>
      </div>
      
      {/* CSS Styles */}
      <style>{`
        .chatbot-container {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 350px;
          height: 500px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 1000;
        }
        
        .chatbot-header {
          background-color: #006241;
          color: white;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .chatbot-title {
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .chatbot-close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }
        
        .chatbot-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .message {
          padding: 10px 15px;
          border-radius: 18px;
          max-width: 80%;
          word-break: break-word;
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .bot-message {
          background-color: #f0f0f0;
          align-self: flex-start;
          border-bottom-left-radius: 5px;
        }
        
        .user-message {
          background-color: #006241;
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 5px;
        }
        
        .chatbot-input-form {
          display: flex;
          padding: 10px;
          border-top: 1px solid #eee;
        }
        
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .typing-indicator span {
          width: 8px;
          height: 8px;
          background-color: #888;
          border-radius: 50%;
          display: inline-block;
          animation: typing-bounce 1.4s infinite ease-in-out both;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typing-bounce {
          0%, 80%, 100% { transform: scale(0.6); }
          40% { transform: scale(1); }
        }
        
        .chatbot-input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 20px;
          outline: none;
        }
        
        .chatbot-send-btn {
          background-color: #006241;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 0 15px;
          margin-left: 10px;
          cursor: pointer;
        }
        
        .chatbot-footer {
          padding: 5px 10px;
          text-align: center;
          font-size: 0.8rem;
          color: #888;
          border-top: 1px solid #eee;
        }
        
        @media (max-width: 480px) {
          .chatbot-container {
            width: 90%;
            height: 70vh;
            bottom: 70px;
            right: 5%;
          }
        }
      `}</style>
    </div>
  );
}

export default ChatbotInterface;