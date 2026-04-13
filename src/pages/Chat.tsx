import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  time: string;
}

const DEMO_REPLIES = [
  "Отличный вопрос! Я обработал ваш запрос и готов помочь. Уточните детали, если нужно.",
  "Понял вас. На основе вашего запроса могу предложить несколько вариантов решения.",
  "Спасибо за запрос. Анализирую информацию и формирую ответ...",
  "Готово! Вот что я нашёл по вашей теме. Могу углубиться в любой из аспектов.",
  "Интересный вопрос. Давайте разберём это по шагам для лучшего понимания.",
];

function getTime() {
  return new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 message-bubble">
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{ background: "var(--chat-accent)" }}
      >
        <Icon name="Bot" size={14} style={{ color: "#fff" }} />
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1"
        style={{ background: "var(--chat-bot-bubble)", border: "1px solid var(--chat-border)" }}
      >
        <span className="typing-dot w-2 h-2 rounded-full inline-block" style={{ background: "var(--chat-accent)" }} />
        <span className="typing-dot w-2 h-2 rounded-full inline-block" style={{ background: "var(--chat-accent)" }} />
        <span className="typing-dot w-2 h-2 rounded-full inline-block" style={{ background: "var(--chat-accent)" }} />
      </div>
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      text: "Привет! Я ваш AI-ассистент. Готов помочь с любыми вопросами. Чем могу быть полезен?",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = DEMO_REPLIES[Math.floor(Math.random() * DEMO_REPLIES.length)];
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "bot", text: reply, time: getTime() };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-6 py-4 border-b flex-shrink-0"
        style={{ borderColor: "var(--chat-border)", background: "var(--chat-surface)" }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center pulse-accent"
          style={{ background: "var(--chat-accent)" }}
        >
          <Icon name="Bot" size={18} style={{ color: "#fff" }} />
        </div>
        <div>
          <div className="font-semibold text-sm" style={{ color: "var(--chat-text)" }}>
            AI Ассистент
          </div>
          <div className="text-xs flex items-center gap-1.5" style={{ color: "var(--chat-text-muted)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
            онлайн
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            style={{ color: "var(--chat-text-muted)" }}
            title="Очистить чат"
            onClick={() =>
              setMessages([{ id: "1", role: "bot", text: "Чат очищен. Чем могу помочь?", time: getTime() }])
            }
          >
            <Icon name="Trash2" size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 message-bubble ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {msg.role === "bot" && (
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: "var(--chat-accent)" }}
              >
                <Icon name="Bot" size={14} style={{ color: "#fff" }} />
              </div>
            )}
            {msg.role === "user" && (
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
              >
                <Icon name="User" size={14} style={{ color: "var(--chat-text-muted)" }} />
              </div>
            )}
            <div className={`flex flex-col gap-1 max-w-[70%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user" ? "rounded-2xl rounded-tr-sm" : "rounded-2xl rounded-tl-sm"
                }`}
                style={{
                  background: msg.role === "user" ? "var(--chat-user-bubble)" : "var(--chat-bot-bubble)",
                  border: "1px solid var(--chat-border)",
                  color: "var(--chat-text)",
                }}
              >
                {msg.text}
              </div>
              <span className="text-xs" style={{ color: "var(--chat-text-muted)" }}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="px-6 py-4 border-t flex-shrink-0"
        style={{ borderColor: "var(--chat-border)", background: "var(--chat-surface)" }}
      >
        <div
          className="flex items-end gap-3 rounded-xl px-4 py-3"
          style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
        >
          <button className="p-1 rounded-lg hover:bg-white/5 transition-colors" style={{ color: "var(--chat-text-muted)" }}>
            <Icon name="Paperclip" size={18} />
          </button>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextarea}
            onKeyDown={handleKey}
            placeholder="Напишите сообщение... (Enter для отправки)"
            rows={1}
            className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed"
            style={{ color: "var(--chat-text)", maxHeight: "120px" }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="send-btn w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <Icon name="SendHorizontal" size={16} style={{ color: "#fff" }} />
          </button>
        </div>
        <div className="text-xs mt-2 text-center" style={{ color: "var(--chat-text-muted)" }}>
          Shift+Enter для новой строки
        </div>
      </div>
    </div>
  );
}
