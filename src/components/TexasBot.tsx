import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader as Loader2, ChevronDown, Zap } from "lucide-react";

interface Message {
  role: "bot" | "user";
  content: string;
  typing?: boolean;
}

type FunnelStep =
  | "greeting"
  | "calls_per_week"
  | "missed_calls"
  | "job_value"
  | "shock"
  | "plan_push"
  | "capture_name"
  | "capture_email"
  | "capture_phone"
  | "submitting"
  | "done"
  | "open_chat";

const DELAY = 900;

const BOT_AVATAR = (
  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}>
    <Zap className="w-4 h-4 text-white" />
  </div>
);

export default function TexasBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<FunnelStep>("greeting");
  const [userData, setUserData] = useState({ callsPerWeek: 0, missedCalls: 0, jobValue: 0, name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [openChatMode, setOpenChatMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-open after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => { setOpen(true); }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Start funnel when opened
  useEffect(() => {
    if (open && messages.length === 0) {
      startFunnel();
    }
  }, [open]);

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [messages]);

  useEffect(() => {
    if (open && !minimized) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open, minimized]);

  const addBotMessage = useCallback((content: string, delay = 0) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", content: "", typing: true }]);
        setTimeout(() => {
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last?.typing) updated[updated.length - 1] = { role: "bot", content, typing: false };
            return updated;
          });
          resolve();
        }, 800);
      }, delay);
    });
  }, []);

  const startFunnel = async () => {
    await addBotMessage("Howdy. I'm Texas Bot — AI dispatcher for Texas plumbers. 👋", 300);
    await addBotMessage("I'm going to show you exactly how much revenue you're losing right now in under 60 seconds.", 1200);
    await addBotMessage("First — how many calls does your business get per week? (Just your best guess)", 2200);
    setStep("calls_per_week");
  };

  const initOpenChat = async () => {
    setOpenChatMode(true);
    setStep("open_chat");
    if (conversationId === null) {
      try {
        const res = await fetch("/api/openai/conversations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: "Texas Bot Chat" }) });
        const data = await res.json();
        setConversationId(data.id);
      } catch {}
    }
  };

  const handleUserMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const trimmed = text.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);

    if (openChatMode) {
      await handleOpenChat(trimmed);
      return;
    }

    setLoading(true);
    try {
      await processFunnelStep(trimmed);
    } finally {
      setLoading(false);
    }
  };

  const processFunnelStep = async (text: string) => {
    const num = parseInt(text.replace(/[^0-9]/g, "")) || 0;

    if (step === "calls_per_week") {
      const calls = Math.max(num, 1);
      setUserData((prev) => ({ ...prev, callsPerWeek: calls }));
      await addBotMessage(`Got it — about ${calls} calls/week. 📞`, 400);
      await addBotMessage("Now, out of those — how many do you think you miss? (after hours, mid-job, etc.)", 1100);
      setStep("missed_calls");
    } else if (step === "missed_calls") {
      const missed = Math.max(num, 0);
      setUserData((prev) => ({ ...prev, missedCalls: missed }));
      await addBotMessage(`${missed} missed per week. That's more than you think it is.`, 400);
      await addBotMessage("Last one — what's your average job value? (think repairs, installs, emergencies)", 1100);
      setStep("job_value");
    } else if (step === "job_value") {
      const value = Math.max(num, 100);
      const { missedCalls } = userData;
      const weekly = missedCalls * value;
      const monthly = weekly * 4;
      setUserData((prev) => ({ ...prev, jobValue: value }));
      setStep("shock");
      await addBotMessage("Calculating your revenue leak...", 400);
      await addBotMessage(`🔴 You're losing ~$${monthly.toLocaleString()}/month in uncaptured demand.`, 1300);
      await addBotMessage(`That's $${(weekly * 52).toLocaleString()}/year in jobs going straight to your competitor. Silent loss.`, 2200);
      await addBotMessage("Here's the fix: Our Platinum Enrollment ($99/week) activates 24/7 AI dispatch — and pays for itself with ONE recovered emergency call.", 3200);
      await addBotMessage("Want me to lock in your 72-hour free trial? Takes 60 seconds — I'll collect your info right here.", 4400);
      setStep("plan_push");
    } else if (step === "plan_push") {
      const lower = text.toLowerCase();
      if (lower.includes("yes") || lower.includes("sure") || lower.includes("ok") || lower.includes("yeah") || lower.includes("do it") || lower.includes("go") || lower.includes("lock") || lower.includes("trial") || lower.includes("free")) {
        await addBotMessage("Let's do this. What's your first name?", 400);
        setStep("capture_name");
      } else if (lower.includes("no") || lower.includes("not") || lower.includes("maybe") || lower.includes("think")) {
        await addBotMessage("Understood. One missed emergency job costs more than 3 months of enrollment. But it's your call.", 400);
        await addBotMessage("Want to ask me anything else about how it works?", 1200);
        await initOpenChat();
      } else {
        await addBotMessage("Just type 'Yes' to lock in your free trial, or ask me anything.", 400);
      }
    } else if (step === "capture_name") {
      const name = text;
      setUserData((prev) => ({ ...prev, name }));
      await addBotMessage(`Nice to meet you, ${name.split(" ")[0]}. 💪`, 400);
      await addBotMessage("What's your business email? (We'll send confirmation there)", 1000);
      setStep("capture_email");
    } else if (step === "capture_email") {
      if (!text.includes("@") || !text.includes(".")) {
        await addBotMessage("Hmm, that doesn't look like an email. Try again:", 400);
        return;
      }
      setUserData((prev) => ({ ...prev, email: text }));
      await addBotMessage("Perfect. Last one — your phone number (we may call to confirm your setup):", 800);
      setStep("capture_phone");
    } else if (step === "capture_phone") {
      const digits = text.replace(/[^0-9]/g, "");
      if (digits.length < 10) {
        await addBotMessage("Need a full 10-digit number. Try again:", 400);
        return;
      }
      setUserData((prev) => ({ ...prev, phone: text }));
      setStep("submitting");
      await addBotMessage("Submitting your enrollment now...", 400);
      await submitLead();
    }
  };

  const submitLead = async () => {
    const { name, email, phone, callsPerWeek, missedCalls, jobValue } = userData;
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ") || "—";
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          company: `${firstName}'s Plumbing Business`,
          email,
          phone,
          serviceArea: `Texas — ${missedCalls} missed calls/wk, $${jobValue}/job, ${callsPerWeek} calls/wk`,
          missedCallsHandling: "Enrolled via Texas Bot chat funnel",
        }),
      });
      if (res.ok) {
        await addBotMessage(`✅ Done! Your 72-hour trial is enrolled, ${firstName}.`, 600);
        await addBotMessage("Vic from Texas Plumbing Dispatch will reach out within 24 hours to get you fully live.", 1500);
        await addBotMessage("In the meantime — have any questions about how the system works?", 2400);
        setStep("done");
        await initOpenChat();
      } else {
        await addBotMessage("There was a connection issue. Please fill the form on the page — it takes 60 seconds.", 600);
        setStep("open_chat");
        await initOpenChat();
      }
    } catch {
      await addBotMessage("Connection error. Please fill the registration form on the page directly.", 600);
      setStep("open_chat");
      await initOpenChat();
    }
  };

  const handleOpenChat = async (text: string) => {
    if (conversationId === null) return;
    setLoading(true);
    setMessages((prev) => [...prev, { role: "bot", content: "", typing: true }]);
    try {
      const response = await fetch(`/api/openai/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      if (!response.body) throw new Error("No stream");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value).split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.slice(6));
              if (json.content) {
                full += json.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  if (last?.role === "bot") updated[updated.length - 1] = { role: "bot", content: full, typing: false };
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
        if (last?.role === "bot") updated[updated.length - 1] = { role: "bot", content: "Connection error — try again or email vic@texasdispatch.site", typing: false };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    if (step === "calls_per_week") return "e.g. 80 calls per week...";
    if (step === "missed_calls") return "e.g. 30 missed...";
    if (step === "job_value") return "e.g. 1200...";
    if (step === "plan_push") return "Type yes to enroll, or ask a question...";
    if (step === "capture_name") return "Your full name...";
    if (step === "capture_email") return "Your business email...";
    if (step === "capture_phone") return "Your phone number...";
    return "Ask me anything...";
  };

  return (
    <>
      {/* Bubble trigger */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setOpen(true); setMinimized(false); }}
            className="fixed bottom-28 sm:bottom-20 md:bottom-6 right-3 sm:right-4 z-50 flex flex-col items-center gap-1"
            data-testid="btn-texas-bot-open"
          >
            <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 0 25px rgba(249,115,22,0.6), 0 4px 20px rgba(0,0,0,0.4)" }}>
              <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <span className="hidden sm:inline-block text-xs font-black text-white px-3 py-1 rounded-full" style={{ background: "rgba(249,115,22,0.9)", boxShadow: "0 0 10px rgba(249,115,22,0.4)" }}>
              Texas Bot
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-28 sm:bottom-20 md:bottom-6 right-3 sm:right-4 z-50 rounded-2xl overflow-hidden flex flex-col"
            style={{
              width: "min(380px, calc(100vw - 32px))",
              height: minimized ? "60px" : "min(560px, calc(100dvh - 160px), calc(100vh - 160px))",
              maxHeight: minimized ? "60px" : "calc(100dvh - 160px)",
              background: "rgba(8,10,25,0.97)",
              border: "1px solid rgba(249,115,22,0.35)",
              boxShadow: "0 20px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(249,115,22,0.15)",
              backdropFilter: "blur(20px)",
              transition: "height 0.3s ease",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05))", borderBottom: minimized ? "none" : "1px solid rgba(249,115,22,0.2)" }}
              onClick={() => setMinimized(!minimized)}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}>
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-black text-white leading-none">Texas Bot</p>
                  <p className="text-xs mt-0.5" style={{ color: "#f97316" }}>AI Dispatch Assistant • Live</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.div animate={{ rotate: minimized ? 180 : 0 }}>
                  <ChevronDown className="w-4 h-4" style={{ color: "#f97316" }} />
                </motion.div>
                <button
                  onClick={(e) => { e.stopPropagation(); setOpen(false); setMinimized(false); }}
                  className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                  data-testid="btn-texas-bot-close"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: "thin" }}>
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "bot" && <div className="mb-1">{BOT_AVATAR}</div>}
                      <div
                        className="max-w-[78%] px-4 py-3 text-sm leading-relaxed"
                        style={msg.role === "user"
                          ? { background: "linear-gradient(135deg, #f97316, #ea580c)", color: "white", borderRadius: "18px 18px 4px 18px" }
                          : { background: "rgba(255,255,255,0.06)", color: "#e2e8f0", borderRadius: "18px 18px 18px 4px", border: "1px solid rgba(255,255,255,0.08)" }
                        }
                        data-testid={`chat-message-${i}`}
                      >
                        {msg.typing ? (
                          <span className="flex gap-1.5 items-center py-1">
                            {[0, 150, 300].map((d) => (
                              <span key={d} className="w-2 h-2 rounded-full" style={{ background: "#f97316", animation: `bounce 1s ${d}ms infinite` }} />
                            ))}
                          </span>
                        ) : msg.content}
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                {/* Quick replies for plan push */}
                {step === "plan_push" && (
                  <div className="px-4 pb-2 flex gap-2">
                    <button onClick={() => handleUserMessage("Yes, lock in my free trial")} className="flex-1 py-2 rounded-xl text-sm font-bold btn-green" style={{ fontSize: "12px" }}>Yes, lock it in</button>
                    <button onClick={() => handleUserMessage("Tell me more")} className="flex-1 py-2 rounded-xl text-sm font-bold" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#c0c8e8", fontSize: "12px" }}>Tell me more</button>
                  </div>
                )}

                {/* Hint text */}
                {step !== "submitting" && (
                  <div className="px-4 pt-1 pb-1">
                    <p className="text-xs" style={{ color: "#4b5563" }}>{getPlaceholder()}</p>
                  </div>
                )}

                {/* Input */}
                <div className="px-4 pb-4 flex-shrink-0">
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(249,115,22,0.2)" }}>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleUserMessage(input); } }}
                      placeholder="Type here..."
                      className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
                      disabled={loading || step === "submitting"}
                      data-testid="input-chat-message"
                    />
                    <button
                      onClick={() => handleUserMessage(input)}
                      disabled={loading || !input.trim() || step === "submitting"}
                      className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-40 transition-all"
                      style={{ background: "#f97316" }}
                      data-testid="btn-chat-send"
                    >
                      {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
