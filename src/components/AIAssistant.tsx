import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Role } from '../types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  userRole: Role;
}

export default function AIAssistant({ userRole }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: userRole === 'landing' 
        ? "Welcome to OmniRoute! I'm your AI Logistics Advisor. How can I help you explore our platform's capabilities today?"
        : `Hello! I'm your OmniRoute AI Assistant. How can I help you with your ${userRole} operations today?` 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update initial message if role changes
    setMessages([
      { 
        role: 'assistant', 
        content: userRole === 'landing' 
          ? "Welcome to OmniRoute! I'm your AI Logistics Advisor. How can I help you explore our platform's capabilities today?"
          : `Hello! I'm your OmniRoute AI Assistant. How can I help you with your ${userRole} operations today?` 
      }
    ]);
  }, [userRole]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API Key is missing. Please ensure it is set in your environment variables.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const model = "gemini-flash-latest";
      
      const systemInstruction = `
        You are the OmniRoute AI Assistant, a specialized logistics expert.
        OmniRoute is a high-performance logistics ERP system.
        
        Current Context:
        - User Role: ${userRole}
        ${userRole === 'landing' ? '- The user is currently on the landing page exploring the product.' : '- The user is logged into their dashboard.'}
        
        Your capabilities:
        1. Explain logistics concepts (Last-mile delivery, cross-docking, route optimization).
        2. Provide advice on fleet management and supply chain efficiency.
        3. Explain how OmniRoute helps different roles (Customers, Drivers, Partners, Dispatchers).
        4. Answer technical questions about logistics data and trends.
        
        Tone: Professional, efficient, and data-driven. Use industry terminology (e.g., SLA, ETA, SKU, LTL, FTL).
        
        If the user asks about specific data in their dashboard, explain that you are an AI advisor and can help interpret logistics trends and best practices based on the data they see.
      `;

      // Use generateContent for maximum compatibility
      const response = await ai.models.generateContent({
        model: model,
        contents: userMessage,
        config: {
          systemInstruction: systemInstruction,
        },
      });

      const aiResponse = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error: any) {
      console.error("Gemini Error:", error);
      const errorMessage = error.message || "An unexpected error occurred.";
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${errorMessage}. Please check the console for more details.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] size-14 bg-primary rounded-full shadow-lg shadow-primary/20 flex items-center justify-center text-background-dark cursor-pointer group"
      >
        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="absolute -top-12 right-0 bg-surface-dark border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-md">
          AI Logistics Advisor
        </div>
        <MessageSquare className="size-6 relative z-10" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-8 z-[100] w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] sm:h-[600px] max-h-[calc(100vh-8rem)] bg-surface-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sparkles className="size-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display">Logistics Assistant</h3>
                  <p className="text-[10px] text-primary font-mono uppercase tracking-wider">Powered by Gemini</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/50 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`size-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                      msg.role === 'user' ? 'bg-slate-700' : 'bg-primary/20'
                    }`}>
                      {msg.role === 'user' ? <User className="size-4" /> : <Bot className="size-4 text-primary" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed break-words whitespace-pre-wrap ${
                      msg.role === 'user' 
                        ? 'bg-primary text-background-dark rounded-tr-none' 
                        : 'bg-white/5 text-white/80 rounded-tl-none border border-white/5'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Bot className="size-4 text-primary" />
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl rounded-tl-none border border-white/5">
                      <Loader2 className="size-4 animate-spin text-primary" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about route optimization..."
                  className="w-full bg-background-dark border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-lg text-background-dark hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="size-4" />
                </button>
              </div>
              <p className="text-[10px] text-white/20 mt-3 text-center font-mono">
                AI can make mistakes. Verify critical logistics data.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
