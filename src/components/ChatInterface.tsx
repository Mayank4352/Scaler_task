import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import { getAIResponse } from '../services/geminiService'; 
import '../styles/ChatInterface.css';
import { Brain, Send, Code, Sparkles } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const [leetCodeUrl, setLeetCodeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !leetCodeUrl.trim()) return;

    const userMessage = {
      role: 'user',
      content: `Problem URL: ${leetCodeUrl}\nQuestion: ${input}`,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLeetCodeUrl('');
    setIsLoading(true);

    try {
      const response = await getAIResponse(leetCodeUrl, input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="logo-container ">
          <Brain size={32} className="text-indigo-300" />
          <Sparkles size={24} className="text-indigo-300" />
        </div>
        <h1 className="chat-title">AlgoMentor</h1>
        <p className="chat-subtitle">Your personal DSA teaching assistant</p>
        
        <div className="instructions">
          <div className="flex items-center gap-2 mb-2">
            <Code size={20} className="text-indigo-300" />
            <p className="font-medium">How can I help with your coding challenges?</p>
          </div>
          <p>
            Provide a LeetCode problem URL and your specific question, and I'll guide you through the solution approach, complexity analysis, or any DSA concept you're struggling with.
          </p>
        </div>
        
        <div className="messages-container">
          {messages.length === 0 && (
            <div className="empty-state">
              <Brain size={48} className="mb-4" />
              <p>Ask me anything about algorithms and data structures!</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={classNames('message', {
                'user-message': message.role === 'user',
                'assistant-message': message.role === 'assistant',
              })}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          ))}
          
          {isLoading && (
            <div className="message assistant-message loading">
              <div className="flex items-center gap-2">
                <div className="pulse-dot"></div>
                <div className="pulse-dot"></div>
                <div className="pulse-dot"></div>
                <span className="ml-2">Analyzing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="input-container">
        <div className="input-fields">
          <input
            type="url"
            value={leetCodeUrl}
            onChange={(e) => setLeetCodeUrl(e.target.value)}
            placeholder="Enter LeetCode problem URL (optional)..."
            className="url-input"
          />
          <div className="input-row">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about algorithms, time complexity, or problem-solving approaches..."
              className="message-input"
            />
            <button 
              type="submit" 
              disabled={isLoading || (!input.trim() && !leetCodeUrl.trim())}
              className="flex items-center justify-center"
            >
              <Send size={18} className="mr-1 send-icon" /> Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;