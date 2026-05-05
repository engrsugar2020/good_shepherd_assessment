import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = {
  role: "bot" | "user";
  content: string;
};

const quickReplies = [
  "What services do you offer?",
  "How do I get a care assessment?",
  "What areas do you cover?",
  "How are your carers vetted?",
];

const botResponses: Record<string, string> = {
  "what services do you offer?": "We offer a comprehensive range of home care services including:\n\n• Dementia Care\n• Respite Care\n• Companionship\n• Live-In Care\n• Post-Hospital Recovery\n• Complex Clinical Care\n\nEach service is tailored to individual needs. Would you like to know more about any specific service, or would you like to request a free care assessment?",
  "how do i get a care assessment?": "Getting a care assessment is simple and completely free! You can:\n\n1. Fill out our online Free Care Assessment form\n2. Call us directly on 07815 493302\n3. Email us at assessment@goodshepherdhomecare.co.uk\n\nOur Senior Care Coordinator will respond within 2 hours during office hours. There's no obligation — it's just a friendly conversation to understand your needs.",
  "what areas do you cover?": "We provide home care services across:\n\n• Glasgow City\n• East Dunbartonshire\n• Partick & West End\n• Bearsden and Milngavie\n\nOur local teams understand the communities they serve. If you're unsure whether we cover your area, please call us on 07815 493302.",
  "how are your carers vetted?": "We have one of the strictest vetting processes in the industry — the Good Shepherd Vetting Standard:\n\n• Enhanced PVG checks through Disclosure Scotland\n• Face-to-face assessments with practical care simulations\n• Triple reference checks\n• Mandatory monthly training workshops\n• Ongoing supervision and performance reviews\n\nEvery applicant must meet the Good Shepherd standard before joining our team.",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  
  // Check for exact matches first
  if (botResponses[lower]) return botResponses[lower];
  
  // Keyword matching
  if (lower.includes("service") || lower.includes("offer") || lower.includes("provide")) {
    return botResponses["what services do you offer?"];
  }
  if (lower.includes("assessment") || lower.includes("start") || lower.includes("begin") || lower.includes("book")) {
    return botResponses["how do i get a care assessment?"];
  }
  if (lower.includes("area") || lower.includes("cover") || lower.includes("location") || lower.includes("glasgow") || lower.includes("where")) {
    return botResponses["what areas do you cover?"];
  }
  if (lower.includes("vet") || lower.includes("safe") || lower.includes("trust") || lower.includes("check") || lower.includes("train")) {
    return botResponses["how are your carers vetted?"];
  }
  if (lower.includes("cost") || lower.includes("price") || lower.includes("how much") || lower.includes("fee")) {
    return "Every care package is tailored to individual needs, so costs vary. We provide transparent, no-obligation cost breakdowns during your free care assessment. There are no hidden fees. Would you like to request a free assessment?";
  }
  if (lower.includes("dementia")) {
    return "Our Dementia Care service provides person-centred support focused on dignity, routine, and cognitive stimulation. Our carers undergo specialist training with Dementia UK. Would you like to learn more or request a free assessment?";
  }
  if (lower.includes("respite")) {
    return "Our Respite Care service gives family caregivers the break they deserve. We can step in for hours, days, or weeks — ensuring your loved one stays safe and happy. Would you like to discuss your needs?";
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! Welcome to Good Shepherd HomeCare Ltd. I'm here to help you find the right care for your loved one. How can I assist you today?";
  }
  if (lower.includes("phone") || lower.includes("call") || lower.includes("contact") || lower.includes("number")) {
    return "You can reach us on 07815 493302. We're available 24/7 for emergencies, and during office hours (Mon-Fri, 8am-6pm) for general enquiries. You can also email assessment@goodshepherdhomecare.co.uk.";
  }
  
  return "Thank you for your question. For the most accurate and personalised response, I'd recommend:\n\n• Calling us on 07815 493302\n• Requesting a free care assessment\n• Emailing assessment@goodshepherdhomecare.co.uk\n\nOur team will be happy to help with your specific situation. Is there anything else I can help with?";
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hello! I'm the Good Shepherd HomeCare assistant. I can help you learn about our services, coverage areas, or how to get started with a free care assessment. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const message = text || input;
    if (!message.trim()) return;

    const userMsg: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(message);
      setMessages((prev) => [...prev, { role: "bot", content: response }]);
    }, 600);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--purple-primary)] text-white shadow-lg hover:bg-[var(--purple-dark)] transition-all hover:scale-105 flex items-center justify-center"
        aria-label="Chat with us"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[var(--purple-primary)] text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Good Shepherd Assistant</h3>
              <p className="text-xs text-white/70">Online • Typically replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-[var(--purple-lightest)] flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-[var(--purple-primary)]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-[var(--purple-primary)] text-white rounded-br-md"
                      : "bg-[var(--purple-lightest)] text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-[var(--gold-primary)]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-[var(--gold-dark)]" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="text-xs bg-[var(--purple-lightest)] text-[var(--purple-primary)] px-3 py-1.5 rounded-full hover:bg-[var(--purple-lighter)] transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 border border-input rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--purple-primary)]/30"
              />
              <Button
                type="submit"
                size="sm"
                className="rounded-full w-9 h-9 p-0 bg-[var(--purple-primary)] hover:bg-[var(--purple-dark)]"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
