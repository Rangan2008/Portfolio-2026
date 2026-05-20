
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Loader2, Bot } from "lucide-react";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to neural uplink. Please check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[90vw] md:w-96 h-[500px] bg-[#0d1829] border border-teal-500/30 rounded-2xl flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-teal-500/20 flex items-center justify-between bg-teal-500/5 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Rangan's AI Aide</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-teal-400/70 font-mono tracking-widest uppercase">Neural_Uplink_Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-teal-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-8">
                  <div className="p-4 rounded-full bg-teal-500/5 text-teal-400/30">
                    <MessageSquare size={48} />
                  </div>
                  <p className="text-xs text-slate-500">
                    Ask me anything about Rangan's projects, experience, or skills. I'm connected directly to his resume core.
                  </p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-teal-400 text-[#060b14] rounded-br-none' 
                      : 'bg-teal-500/10 text-slate-300 border border-teal-500/20 rounded-bl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 animate-pulse">
                    <Loader2 size={18} className="animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-teal-500/20">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="w-full bg-[#060b14] border border-teal-500/20 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-teal-400 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-teal-400 hover:text-teal-300 disabled:text-slate-700 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-teal-400 text-[#060b14] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,204,0.5)] z-50 overflow-hidden relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? <X key="x" size={24} /> : <MessageSquare key="msg" size={24} />}
        </AnimatePresence>
        
        {/* Radar Effect — limited iterations to avoid infinite GPU layer */}
        <motion.div 
           className="absolute inset-0 border border-teal-400 rounded-full"
           animate={{ scale: [1, 2], opacity: [0.5, 0] }}
           transition={{ duration: 2, repeat: 3 }}
        />
      </motion.button>
    </div>
  );
};
