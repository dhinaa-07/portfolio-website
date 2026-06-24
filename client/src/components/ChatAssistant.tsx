import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Send, Mic, Volume2, VolumeX, Feather, Sparkles } from 'lucide-react';
import { API_URL } from '../config';

/* ═══════════════════════════════════════════════════
   CUSTOM PARSER FOR REACT 19 CRASH-PROOF MARKDOWN
   ═══════════════════════════════════════════════════ */

function parseInlineStyles(text: string) {
  if (!text) return '';
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="font-extrabold text-[#2c2c2c]">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={idx} className="bg-black/10 dark:bg-black/15 px-1 py-0.5 rounded font-mono font-bold text-[0.9em]">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

function SafeMarkdown({ content }: { content: string }) {
  if (!content) return null;

  // Split by double newlines to isolate paragraphs/blocks
  const blocks = content.split(/\n\n/);

  return (
    <div className="space-y-2 text-[#3d3d3d]">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Code blocks
        if (trimmed.startsWith('```')) {
          const lines = trimmed.split('\n');
          const codeLines = lines.slice(1, lines[lines.length - 1] === '```' ? -1 : undefined);
          return (
            <pre key={idx} className="bg-black/5 dark:bg-black/10 p-2.5 rounded-md font-mono text-[10px] overflow-x-auto my-1">
              <code>{codeLines.join('\n')}</code>
            </pre>
          );
        }

        // Bullet lists
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split(/\n[-*]\s+/);
          return (
            <ul key={idx} className="list-disc pl-4 space-y-1 my-1">
              {items.map((item, itemIdx) => {
                const cleanedItem = itemIdx === 0 ? item.replace(/^[-*]\s+/, '') : item;
                return (
                  <li key={itemIdx} className="font-serif text-xs">
                    {parseInlineStyles(cleanedItem)}
                  </li>
                );
              })}
            </ul>
          );
        }

        // Default Paragraph
        return (
          <p key={idx} className="leading-relaxed font-serif text-xs">
            {parseInlineStyles(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

const suggestedQuestions = [
  "Tell me about Dhinakaran",
  "What are his skills?",
  "Show his projects",
  "What is ResQNow?",
  "How can I contact him?",
  "Tell me about PyExpo"
];

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface ChatAssistantProps {
  theme: string;
  isOpenExternal?: boolean;
  setIsOpenExternal?: (isOpen: boolean) => void;
}

export default function ChatAssistant({ theme, isOpenExternal, setIsOpenExternal }: ChatAssistantProps) {
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Hello! I am Dhina AI, Dhinakaran's digital assistant. Ask me anything about his projects, skills, education, or experience!" }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalIsOpen;
  const setIsOpen = setIsOpenExternal !== undefined ? setIsOpenExternal : setInternalIsOpen;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const speak = (text: string) => {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    // Strip markdown tags from voice readouts
    const plainText = text.replace(/[*#`_\-]/g, '');
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = 'en-US';
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);
    
    // Add an empty AI message to be streamed into
    setMessages(prev => [...prev, { role: 'ai', content: '' }]);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newMessages.slice(0, -1)
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setIsTyping(false);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let aiReply = "";

      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.text) {
                  aiReply += parsed.text;
                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1].content = aiReply;
                    return updated;
                  });
                }
              } catch (e) {
                console.error("Error parsing SSE data:", e);
              }
            }
          }
        }
      }

      if (isVoiceEnabled && aiReply) {
        speak(aiReply);
      }

    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].content = "I'm having trouble connecting to my server right now. Please try again shortly!";
        return updated;
      });
    }
  };

  const toggleListen = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support Web Speech Recognition.');
      return;
    }
    
    if (isListening) return;
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  return (
    <>
      {/* Floating Trigger Button — Book-themed */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-40 flex items-center justify-center cursor-pointer border-2 ${
          isOpen ? 'hidden' : 'flex'
        }`}
        style={{
          background: 'linear-gradient(135deg, #8b0000, #5c0000)',
          borderColor: 'rgba(139, 0, 0, 0.3)',
          color: '#fdf6e3',
          boxShadow: '0 6px 24px rgba(139, 0, 0, 0.4)',
        }}
      >
        <Feather className="h-6 w-6" />
      </motion.button>

      {/* Chat Window Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 w-[430px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[calc(100vh-6rem)] z-50 rounded-2xl flex flex-col overflow-hidden shadow-2xl text-slate-800 dark:text-slate-200"
            style={{ background: '#fdf6e3', border: '2px solid rgba(139, 0, 0, 0.3)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(139, 0, 0, 0.2)', background: 'linear-gradient(135deg, #8b0000, #5c0000)' }}>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-400 border border-white/20" />
                </div>
                <div>
                  <span className="font-sans font-bold text-sm tracking-wider uppercase text-amber-100">
                    Dhina AI
                  </span>
                  <span className="text-[9px] text-green-300 block font-semibold leading-none">Online</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)} 
                  className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${
                    isVoiceEnabled ? 'text-amber-300' : 'text-amber-100/50'
                  }`}
                  title={isVoiceEnabled ? "Mute Readout" : "Enable Readout (TTS)"}
                >
                  {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-amber-100/60 hover:text-red-300"
                  title="Close Assistant"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 text-xs leading-relaxed custom-scrollbar" style={{ fontFamily: "'Lora', serif", background: '#fdf6e3' }}>
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.role === 'user'
                      ? 'text-white rounded-br-none'
                      : 'rounded-bl-none'
                  }`}
                  style={msg.role === 'user'
                    ? { background: 'linear-gradient(135deg, #8b0000, #5c0000)' }
                    : { background: '#f0eade', border: '1px solid rgba(139, 0, 0, 0.2)', color: '#2c2c2c' }
                  }>
                    {msg.role === 'ai' && msg.content ? (
                      <SafeMarkdown content={msg.content} />
                    ) : (
                      <p className="font-serif text-xs leading-relaxed text-[#2c2c2c]">{msg.content || (index === messages.length - 1 && !isTyping ? "Generating..." : "")}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Dot indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-4 py-3 rounded-bl-none flex gap-1 items-center" style={{ background: '#f0eade', border: '1px solid rgba(139, 0, 0, 0.2)' }}>
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-[#8b0000]" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[#8b0000]" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[#8b0000]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggested Buttons */}
            {messages.length <= 2 && !isTyping && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5" style={{ borderTop: '1px solid rgba(139, 0, 0, 0.2)', background: '#f0eade' }}>
                {suggestedQuestions.map((q, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(q)}
                    className="text-[10px] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                    style={{ border: '1px solid rgba(139, 0, 0, 0.3)', color: '#5a5a5a', background: '#fdf6e3' }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = '#8b0000'; e.currentTarget.style.color = '#8b0000'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(139, 0, 0, 0.3)'; e.currentTarget.style.color = '#5a5a5a'; }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 flex gap-2 items-center" style={{ borderTop: '1px solid rgba(139, 0, 0, 0.2)', background: '#f0eade' }}>
              <button 
                onClick={toggleListen}
                className={`p-2 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'hover:bg-[#f0e6d0]'
                }`}
                style={!isListening ? { color: '#5a5a5a' } : {}}
                title={isListening ? "Listening..." : "Voice Input (STT)"}
              >
                <Mic className="h-4 w-4" />
              </button>
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
                placeholder="Ask about projects, skills, experience..."
                className="flex-1 bg-transparent border-none outline-none text-xs"
                style={{ color: '#2c2c2c', fontFamily: "'Lora', serif" }}
              />
              <button 
                onClick={() => handleSend(inputText)}
                disabled={!inputText.trim() || isTyping}
                className="p-2 rounded-full transition-colors flex-shrink-0 cursor-pointer"
                style={inputText.trim() && !isTyping
                  ? { background: 'linear-gradient(135deg, #8b0000, #5c0000)', color: '#fff' }
                  : { background: '#f0eade', color: '#5a5a5a', cursor: 'not-allowed' }
                }
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
