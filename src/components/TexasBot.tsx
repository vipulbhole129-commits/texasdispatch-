import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  role: "bot" | "user";
  text: string;
};

const initialMessages: Message[] = [
  {
    role: "bot",
    text: "Howdy! I'm the Texas Plumber AI assistant. Want to see how I'd answer your calls? Ask me anything about pricing, features, or just say hi!",
  },
];

const responses: Record<string, string> = {
  pricing:
    "Our plans start at $197/month for up to 100 calls. The Professional plan at $297/month includes 500 calls, emergency dispatch, and calendar integration. No contracts, cancel anytime!",
  features:
    "I answer every call 24/7, capture lead details, schedule appointments, send SMS follow-ups, and route emergency calls straight to your phone. Want to try a demo call?",
  demo: "Sure! I'd answer 'Thank you for calling Rodriguez Plumbing, this is Alex. How can I help you today?' — and then handle whatever the customer needs. Pretty natural, right?",
  emergency:
    "For emergencies like burst pipes or gas leaks, I immediately route the call to your cell phone with a text containing the customer's name, address, and problem description.",
  trial:
    "You can start a 14-day free trial with no credit card required. Just fill out the form above and we'll have you live within 24 hours!",
  hello:
    "Howdy! Happy to help. You can ask me about pricing, features, emergency dispatch, or how the free trial works.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("price") || lower.includes("cost") || lower.includes("plan"))
    return responses.pricing;
  if (lower.includes("feature") || lower.includes("what can") || lower.includes("do"))
    return responses.features;
  if (lower.includes("demo") || lower.includes("try") || lower.includes("example"))
    return responses.demo;
  if (lower.includes("emergen") || lower.includes("urgent") || lower.includes("dispatch"))
    return responses.emergency;
  if (lower.includes("trial") || lower.includes("start") || lower.includes("sign up"))
    return responses.trial;
  return responses.hello;
}

export function TexasBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        role: "bot",
        text: getResponse(input),
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 800);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[480px] w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-border bg-background shadow-2xl">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-semibold">Texas Plumber AI</div>
                <div className="text-xs text-muted-foreground">
                  Online — typically replies instantly
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 hover:bg-muted transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto p-4"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-muted px-3 py-2">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border p-3">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about pricing, features..."
                className="flex-1"
              />
              <Button size="icon" onClick={sendMessage} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
