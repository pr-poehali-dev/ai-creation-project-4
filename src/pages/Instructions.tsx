import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = [
  {
    id: "general",
    label: "Общие команды",
    icon: "Terminal",
    commands: [
      { cmd: "/help", desc: "Показать список всех команд", example: "/help" },
      { cmd: "/clear", desc: "Очистить текущий диалог", example: "/clear" },
      { cmd: "/new", desc: "Начать новый диалог", example: "/new" },
      { cmd: "/save", desc: "Сохранить текущий диалог", example: "/save Анализ продаж" },
    ],
  },
  {
    id: "format",
    label: "Форматирование",
    icon: "FileText",
    commands: [
      { cmd: "/format list", desc: "Ответ в виде списка", example: "/format list Преимущества React" },
      { cmd: "/format table", desc: "Ответ в виде таблицы", example: "/format table Сравнение CRM систем" },
      { cmd: "/format short", desc: "Краткий ответ (1-3 предложения)", example: "/format short Что такое NFT?" },
      { cmd: "/format detailed", desc: "Развёрнутый подробный ответ", example: "/format detailed Стратегия маркетинга" },
    ],
  },
  {
    id: "business",
    label: "Бизнес-задачи",
    icon: "Briefcase",
    commands: [
      { cmd: "/email", desc: "Написать деловое письмо", example: "/email партнёру о переносе встречи" },
      { cmd: "/analyze", desc: "Проанализировать данные или текст", example: "/analyze отчёт о продажах Q1" },
      { cmd: "/plan", desc: "Составить план или стратегию", example: "/plan запуск нового продукта" },
      { cmd: "/translate", desc: "Перевести текст", example: "/translate en Добро пожаловать" },
    ],
  },
  {
    id: "api",
    label: "Интеграции API",
    icon: "Plug",
    commands: [
      { cmd: "/api connect", desc: "Подключить внешний API", example: "/api connect notion sk-xxxxx" },
      { cmd: "/api status", desc: "Статус всех подключений", example: "/api status" },
      { cmd: "/fetch", desc: "Получить данные из URL", example: "/fetch https://api.example.com/data" },
      { cmd: "/webhook", desc: "Настроить вебхук для уведомлений", example: "/webhook set https://..." },
    ],
  },
];

export default function Instructions() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [copied, setCopied] = useState<string | null>(null);

  const category = CATEGORIES.find((c) => c.id === activeCategory)!;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div
        className="px-6 py-4 border-b flex-shrink-0"
        style={{ borderColor: "var(--chat-border)", background: "var(--chat-surface)" }}
      >
        <h1 className="font-semibold text-base mb-1" style={{ color: "var(--chat-text)" }}>
          Команды и инструкции
        </h1>
        <p className="text-xs" style={{ color: "var(--chat-text-muted)" }}>
          Нажмите на пример, чтобы скопировать команду
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Category nav */}
        <div
          className="w-48 flex-shrink-0 p-3 flex flex-col gap-1 border-r overflow-y-auto"
          style={{ background: "var(--chat-surface)", borderColor: "var(--chat-border)" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`nav-item flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-left ${
                activeCategory === cat.id ? "active" : ""
              }`}
              style={{
                color: activeCategory === cat.id ? "var(--chat-accent)" : "var(--chat-text-muted)",
              }}
            >
              <Icon name={cat.icon} size={16} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Commands */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name={category.icon} size={18} style={{ color: "var(--chat-accent)" }} />
            <h2 className="font-semibold text-sm" style={{ color: "var(--chat-text)" }}>
              {category.label}
            </h2>
          </div>
          {category.commands.map((cmd) => (
            <div
              key={cmd.cmd}
              className="rounded-xl p-4"
              style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <code
                  className="text-sm font-mono font-semibold px-2 py-0.5 rounded"
                  style={{ background: "var(--chat-accent-dim)", color: "var(--chat-accent)" }}
                >
                  {cmd.cmd}
                </code>
              </div>
              <p className="text-sm mb-3" style={{ color: "var(--chat-text-muted)" }}>
                {cmd.desc}
              </p>
              <button
                onClick={() => copyToClipboard(cmd.example)}
                className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-xs text-left transition-all hover:bg-white/5"
                style={{ background: "var(--chat-bg)", border: "1px solid var(--chat-border)" }}
              >
                <Icon
                  name={copied === cmd.example ? "Check" : "Copy"}
                  size={12}
                  style={{ color: copied === cmd.example ? "var(--chat-accent)" : "var(--chat-text-muted)", flexShrink: 0 }}
                />
                <span
                  className="font-mono flex-1"
                  style={{ color: copied === cmd.example ? "var(--chat-accent)" : "var(--chat-text)" }}
                >
                  {cmd.example}
                </span>
                <span style={{ color: "var(--chat-text-muted)" }}>
                  {copied === cmd.example ? "Скопировано!" : "Пример"}
                </span>
              </button>
            </div>
          ))}

          {/* Quick tip */}
          <div
            className="rounded-xl p-4 mt-2"
            style={{ background: "var(--chat-accent-dim)", border: "1px solid var(--chat-accent)" }}
          >
            <div className="flex items-start gap-2">
              <Icon name="Lightbulb" size={16} style={{ color: "var(--chat-accent)", flexShrink: 0, marginTop: 1 }} />
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: "var(--chat-accent)" }}>
                  Подсказка
                </p>
                <p className="text-xs" style={{ color: "var(--chat-text-muted)" }}>
                  Команды можно комбинировать: <code className="font-mono">/format list /analyze данные</code> — получите анализ в виде структурированного списка.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
