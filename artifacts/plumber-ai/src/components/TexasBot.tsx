import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

export default function TexasBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Howdy! I'm Texas Bot. Ask me how much money you're losing right now — or anything about Texas Plumbing Dispatch. I'll give it to you straight.",
    },
  ]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && conversationId === null) {
      fetch("/api/openai/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Texas Bot Chat" }),
      })
        .then((r) => r.json())
        .then((data) => setConversationId(data.id))
        .catch(() => {});
    }
  }, [open, conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading || conversationId === null) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    const botIndex = messages.length + 1;
    setMessages((prev) => [...prev, { role: "assistant", content: "", streaming: true }]);

    try {
      const response = await fetch(`/api/openai/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.slice(6));
              if (json.content) {
                fullContent += json.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  if (last?.role === "assistant") {
                    updated[updated.length - 1] = { ...last, content: fullContent, streaming: true };
                  }
                  return updated;
                });
              }
              if (json.done) {
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  if (last?.role === "assistant") {
                    updated[updated.length - 1] = { ...last, streaming: false };
                  }
                  return updated;
                });
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last?.role === "assistant") {
          updated[updated.length - 1] = { ...last, content: "Connection error. Please try again or email vic@texasdispatch.site", streaming: false };
        }
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat bubble */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1"
            data-testid="btn-texas-bot-open"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg orange-glow"
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs font-bold text-white px-2 py-1 rounded-full" style={{ background: "rgba(249,115,22,0.9)" }}>
              Texas Bot
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl overflow-hidden"
            style={{ width: "360px", height: "520px", background: "#0d0f18", border: "1px solid rgba(249,115,22,0.4)", boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(249,115,22,0.2)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ background: "linear-gradient(135deg, #1a1020, #141018)", borderBottom: "1px solid rgba(249,115,22,0.2)" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#f97316" }}>
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Texas Bot</p>
                  <p className="text-xs" style={{ color: "#f97316" }}>AI Sales Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                data-testid="btn-texas-bot-close"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  data-testid={`chat-message-${i}`}
                >
                  <div
                    className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? { background: "#f97316", color: "white", borderRadius: "18px 18px 4px 18px" }
                        : { background: "#111520", color: "#e5e7eb", borderRadius: "18px 18px 18px 4px", border: "1px solid rgba(249,115,22,0.15)" }
                    }
                  >
                    {msg.content || (msg.streaming && (
                      <span className="flex gap-1 items-center">
                        <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#f97316", animationDelay: "0ms" }} />
                        <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#f97316", animationDelay: "150ms" }} />
                        <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#f97316", animationDelay: "300ms" }} />
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Helper text */}
            <div className="px-4 pb-2">
              <p className="text-xs" style={{ color: "#6b7280" }}>Ask how much money you are losing right now.</p>
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "#0a0b12", border: "1px solid rgba(249,115,22,0.25)" }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                  placeholder="Type your question..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
                  disabled={loading}
                  data-testid="input-chat-message"
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-40"
                  style={{ background: "#f97316" }}
                  data-testid="btn-chat-send"
                >
                  {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
