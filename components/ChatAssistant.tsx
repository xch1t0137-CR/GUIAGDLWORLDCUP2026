import React, { useState, useRef, useEffect } from 'react';
import { Send, MapPin, Bot, Loader2, X } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hola! Welcome to Guadalajara! I'm your AI host for the 2026 World Cup. Ask me about match schedules, how to get to Estadio Akron, or where to find the best tacos!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Get location on mount if permitted
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.log("Location access denied or error:", error)
      );
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToGemini(messages, input, location);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden z-40 animate-in slide-in-from-bottom-5 fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-mexico-green to-emerald-700 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-full">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Guadalajara AI Guide</h3>
            <p className="text-xs text-green-100">Powered by Gemini</p>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                msg.role === 'user'
                  ? 'bg-mexico-green text-white rounded-br-none'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              
              {/* Grounding Chips */}
              {msg.groundingUrls && msg.groundingUrls.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {msg.groundingUrls.map((url, idx) => (
                    <a
                      key={idx}
                      href={url.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-100 hover:bg-blue-100 transition"
                    >
                      <MapPin size={12} />
                      {url.title}
                    </a>
                  ))}
                </div>
              )}
              <span className="text-[10px] opacity-70 block mt-1 text-right">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-mexico-green" />
              <span className="text-xs text-gray-500">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about places, matches, safety..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="text-mexico-green disabled:opacity-50 hover:text-emerald-700 transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};