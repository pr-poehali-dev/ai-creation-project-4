import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Dialog {
  id: string;
  title: string;
  preview: string;
  date: string;
  messages: number;
  tags: string[];
}

const DIALOGS: Dialog[] = [
  {
    id: "1",
    title: "Анализ данных продаж",
    preview: "Помоги проанализировать данные продаж за последний квартал...",
    date: "Сегодня, 14:30",
    messages: 12,
    tags: ["аналитика", "продажи"],
  },
  {
    id: "2",
    title: "Написание email-рассылки",
    preview: "Составь текст для email-рассылки нашим клиентам о новом продукте...",
    date: "Вчера, 10:15",
    messages: 8,
    tags: ["маркетинг", "текст"],
  },
  {
    id: "3",
    title: "Оптимизация бизнес-процессов",
    preview: "Как улучшить процесс онбординга новых сотрудников в компании...",
    date: "12 апр, 16:45",
    messages: 24,
    tags: ["HR", "процессы"],
  },
  {
    id: "4",
    title: "Создание контент-плана",
    preview: "Нужен контент-план для социальных сетей компании на месяц...",
    date: "11 апр, 09:20",
    messages: 16,
    tags: ["SMM", "контент"],
  },
  {
    id: "5",
    title: "Юридические вопросы договора",
    preview: "Проверь пункты договора с контрагентом и укажи на риски...",
    date: "10 апр, 18:00",
    messages: 6,
    tags: ["юридическое", "договор"],
  },
];

export default function History() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = DIALOGS.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.preview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div
        className="px-6 py-4 border-b flex-shrink-0"
        style={{ borderColor: "var(--chat-border)", background: "var(--chat-surface)" }}
      >
        <h1 className="font-semibold text-base mb-3" style={{ color: "var(--chat-text)" }}>
          История диалогов
        </h1>
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
        >
          <Icon name="Search" size={16} style={{ color: "var(--chat-text-muted)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по диалогам..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "var(--chat-text)" }}
          />
        </div>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-3 gap-3 px-6 py-4 border-b flex-shrink-0"
        style={{ borderColor: "var(--chat-border)" }}
      >
        {[
          { label: "Всего диалогов", value: DIALOGS.length, icon: "MessageSquare" },
          { label: "Сообщений", value: DIALOGS.reduce((a, b) => a + b.messages, 0), icon: "MessagesSquare" },
          { label: "Сохранено", value: "2", icon: "Bookmark" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-3 text-center"
            style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
          >
            <Icon name={stat.icon} size={20} className="mx-auto mb-1" style={{ color: "var(--chat-accent)" }} />
            <div className="font-bold text-lg" style={{ color: "var(--chat-text)" }}>
              {stat.value}
            </div>
            <div className="text-xs" style={{ color: "var(--chat-text-muted)" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12" style={{ color: "var(--chat-text-muted)" }}>
            <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-40" />
            <p>Диалоги не найдены</p>
          </div>
        ) : (
          filtered.map((dialog) => (
            <div
              key={dialog.id}
              onClick={() => setSelected(selected === dialog.id ? null : dialog.id)}
              className="rounded-xl p-4 cursor-pointer transition-all"
              style={{
                background: selected === dialog.id ? "var(--chat-accent-dim)" : "var(--chat-surface-2)",
                border: `1px solid ${selected === dialog.id ? "var(--chat-accent)" : "var(--chat-border)"}`,
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-medium text-sm" style={{ color: "var(--chat-text)" }}>
                  {dialog.title}
                </h3>
                <span className="text-xs flex-shrink-0" style={{ color: "var(--chat-text-muted)" }}>
                  {dialog.date}
                </span>
              </div>
              <p className="text-xs mb-3 line-clamp-1" style={{ color: "var(--chat-text-muted)" }}>
                {dialog.preview}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5 flex-wrap">
                  {dialog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "var(--chat-accent-dim)",
                        color: "var(--chat-accent)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs" style={{ color: "var(--chat-text-muted)" }}>
                  <Icon name="MessageCircle" size={12} />
                  <span>{dialog.messages}</span>
                </div>
              </div>
              {selected === dialog.id && (
                <div className="mt-3 pt-3 flex gap-2 border-t" style={{ borderColor: "var(--chat-border)" }}>
                  <button
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors"
                    style={{ background: "var(--chat-accent)", color: "#fff" }}
                  >
                    <Icon name="RotateCcw" size={12} />
                    Продолжить
                  </button>
                  <button
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-white/5"
                    style={{ color: "var(--chat-text-muted)", border: "1px solid var(--chat-border)" }}
                  >
                    <Icon name="Bookmark" size={12} />
                    Сохранить
                  </button>
                  <button
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-red-500/10 ml-auto"
                    style={{ color: "#ef4444" }}
                  >
                    <Icon name="Trash2" size={12} />
                    Удалить
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
