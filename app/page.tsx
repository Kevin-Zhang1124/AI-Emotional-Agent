'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function EmoCoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm EmoCoach, your AI emotional support companion. I'm here to help you process and manage your feelings in a healthy way. What's on your mind today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const conversationHistory = messages
        .slice(-6)
        .map(msg => `${msg.isUser ? 'User' : 'EmoCoach'}: ${msg.text}`)
        .join('\n');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory: conversationHistory
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 1.5rem'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#8b5cf6', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px'
          }}>
            💜
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>EmoCoach</h1>
            <p style={{ fontSize: '0.875rem', margin: 0, color: '#64748b' }}>Your AI Emotional Support Companion</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#059669' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
            Online
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main style={{ 
        flex: 1, 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '1.5rem',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                  maxWidth: '80%',
                  borderRadius: '1rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: message.isUser ? '#8b5cf6' : 'white',
                  color: message.isUser ? 'white' : '#1e293b',
                  boxShadow: message.isUser ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  border: message.isUser ? 'none' : '1px solid #e2e8f0'
                }}
              >
                <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: '1.5' }}>{message.text}</p>
                <p style={{ 
                  margin: '0.5rem 0 0 0', 
                  fontSize: '0.75rem', 
                  opacity: 0.7 
                }}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '0.75rem 1rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: '#8b5cf6', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    🤖
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#64748b', borderRadius: '50%', animation: 'bounce 1s infinite' }}></div>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#64748b', borderRadius: '50%', animation: 'bounce 1s infinite 0.1s' }}></div>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#64748b', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer style={{ 
        backgroundColor: 'white', 
        borderTop: '1px solid #e2e8f0',
        padding: '1rem 1.5rem'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what you're feeling... I'm here to listen and help."
                style={{
                  width: '100%',
                  padding: '0.75rem 3rem 0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '1rem',
                  resize: 'none',
                  outline: 'none',
                  fontSize: '0.875rem',
                  backgroundColor: '#f9fafb',
                  minHeight: '48px',
                  maxHeight: '120px'
                }}
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                style={{
                  position: 'absolute',
                  right: '8px',
                  bottom: '8px',
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  opacity: (!inputMessage.trim() || isLoading) ? 0.5 : 1
                }}
              >
                ➤
              </button>
            </div>
          </div>
          
          <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
              💬 EmoCoach is here to support you. Remember, this is not a substitute for professional mental health care.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
