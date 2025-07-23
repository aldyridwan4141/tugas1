import React, { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      console.log('🚀 Chatbot Request:', {
        message: userMessage.text,
        timestamp: new Date().toISOString(),
        endpoint: 'https://aldyridwan41.app.n8n.cloud/webhook/17d992da-195f-4a01-bd0a-9f13c0daa73a'
      });

      const response = await fetch('https://aldyridwan41.app.n8n.cloud/webhook/17d992da-195f-4a01-bd0a-9f13c0daa73a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Chatbot Request Failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          timestamp: new Date().toISOString()
        });
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      console.log('✅ Chatbot Request Success:', {
        timestamp: new Date().toISOString(),
        responseData: data
      });
      
      // Parse the new API response structure
      let filteredReply = 'Maaf, sistem sedang sibuk. Silakan coba lagi.';
      try {
        const raw = data?.content?.parts?.[0]?.text;
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.reply) {
            filteredReply = parsed.reply.trim();
            // Remove "=" at the beginning if it exists
            if (filteredReply.startsWith('=')) {
              filteredReply = filteredReply.slice(1).trim();
            }
            // Remove all "" symbols
            filteredReply = filteredReply.replace(/\\/g, '');
          }
        }
      } catch (e) {
        console.error('❌ Gagal parsing JSON:', e);
        console.log('Raw response data:', data);
      }
      
      console.log('🔄 Filtered Reply:', {
        raw: data?.content?.parts?.[0]?.text,
        filtered: filteredReply,
        timestamp: new Date().toISOString()
      });
      
      const botMessage = {
        id: Date.now() + 1,
        text: filteredReply,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('❌ Chatbot Error:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        userMessage: userMessage.text,
        timestamp: new Date().toISOString()
      });
      
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChatHistory = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          width: '320px',
          height: '384px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #dddddd',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#006241',
            color: '#ffffff',
            padding: '16px',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#a3a36f',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg style={{ width: '18px', height: '18px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7m5 5.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '14px', margin: 0 }}>Fore Coffee Assistant</h3>
                <p style={{ fontSize: '12px', color: '#f8f8f2', margin: 0 }}>Online</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Clear Chat Button */}
              {messages.length > 0 && (
                <button
                  onClick={clearChatHistory}
                  style={{
                    color: '#f8f8f2',
                    background: 'none',
                    border: 'none',
                    padding: '4px',
                    cursor: 'pointer',
                    transition: 'color 0.3s'
                  }}
                  title="Clear chat history"
                  onMouseOver={(e) => e.target.style.color = '#ffffff'}
                  onMouseOut={(e) => e.target.style.color = '#f8f8f2'}
                >
                  <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
              {/* Close Button */}
              <button
                onClick={toggleChat}
                style={{
                  color: '#f8f8f2',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.color = '#ffffff'}
                onMouseOut={(e) => e.target.style.color = '#f8f8f2'}
              >
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: '#f8f8f2'
          }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: '#555555', fontSize: '14px' }}>
                <p>Halo! Saya asisten <strong>Fore Coffee</strong>.</p>
                <p>Ada yang bisa saya bantu hari ini?</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '240px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: message.isUser ? '#006241' : '#ffffff',
                    color: message.isUser ? '#ffffff' : '#333333',
                    borderBottomRightRadius: message.isUser ? '4px' : '8px',
                    borderBottomLeftRadius: message.isUser ? '8px' : '4px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  <p style={{ margin: 0 }}>{message.text}</p>
                  <p style={{
                    fontSize: '12px',
                    marginTop: '4px',
                    margin: 0,
                    color: message.isUser ? '#f8f8f2' : '#a3a36f'
                  }}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  backgroundColor: '#ffffff',
                  color: '#333333',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  borderBottomLeftRadius: '4px',
                  fontSize: '14px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#a3a36f',
                      borderRadius: '50%',
                      animation: 'bounce 1s infinite'
                    }}></div>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#a3a36f',
                      borderRadius: '50%',
                      animation: 'bounce 1s infinite 0.1s'
                    }}></div>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#a3a36f',
                      borderRadius: '50%',
                      animation: 'bounce 1s infinite 0.2s'
                    }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '16px', borderTop: '1px solid #dddddd', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pesan Anda..."
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #dddddd',
                  borderRadius: '4px',
                  outline: 'none',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                style={{
                  backgroundColor: !inputValue.trim() || isLoading ? '#dddddd' : '#006241',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: !inputValue.trim() || isLoading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => {
                  if (!(!inputValue.trim() || isLoading)) {
                    e.target.style.backgroundColor = '#007a50';
                  }
                }}
                onMouseOut={(e) => {
                  if (!(!inputValue.trim() || isLoading)) {
                    e.target.style.backgroundColor = '#006241';
                  }
                }}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Icon - positioned above WhatsApp */}
      <div style={{
        position: 'fixed',
        bottom: '80px',
        right: '24px',
        zIndex: 50
      }}>
        <button
          onClick={toggleChat}
          style={{
            backgroundColor: '#006241',
            color: '#ffffff',
            borderRadius: '50%',
            padding: '16px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s',
            transform: 'scale(1)'
          }}
          title="Chat with Fore Coffee"
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#007a50';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#006241';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7m5 5.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          
          {/* Notification badge */}
          {!isOpen && (
            <div style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '12px',
              height: '12px',
              backgroundColor: '#a3a36f',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></div>
          )}
        </button>
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
};

export default ChatBot;