import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Александр Иванов");
  const [email, setEmail] = useState("a.ivanov@company.ru");
  const [company, setCompany] = useState("ООО «Технологии»");
  const [saved, setSaved] = useState(false);

  const stats = [
    { label: "Диалогов", value: 5, icon: "MessageSquare" },
    { label: "Сообщений", value: 66, icon: "MessagesSquare" },
    { label: "Сохранено", value: 2, icon: "Bookmark" },
    { label: "Дней с нами", value: 14, icon: "Calendar" },
  ];

  const activity = [
    { day: "Пн", msgs: 12 },
    { day: "Вт", msgs: 8 },
    { day: "Ср", msgs: 20 },
    { day: "Чт", msgs: 5 },
    { day: "Пт", msgs: 15 },
    { day: "Сб", msgs: 4 },
    { day: "Вс", msgs: 2 },
  ];
  const maxMsgs = Math.max(...activity.map((a) => a.msgs));

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      {/* Header */}
      <div
        className="px-6 py-4 border-b flex-shrink-0 flex items-center justify-between"
        style={{ borderColor: "var(--chat-border)", background: "var(--chat-surface)" }}
      >
        <h1 className="font-semibold text-base" style={{ color: "var(--chat-text)" }}>
          Личный кабинет
        </h1>
        <button
          onClick={() => (editing ? handleSave() : setEditing(true))}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
          style={{ background: saved ? "#059669" : editing ? "var(--chat-accent)" : "var(--chat-surface-2)", color: editing ? "#fff" : "var(--chat-text-muted)", border: editing ? "none" : "1px solid var(--chat-border)" }}
        >
          <Icon name={saved ? "Check" : editing ? "Save" : "Pencil"} size={14} />
          {saved ? "Сохранено!" : editing ? "Сохранить" : "Редактировать"}
        </button>
      </div>

      <div className="px-6 py-6 flex flex-col gap-6">
        {/* Avatar block */}
        <div
          className="rounded-xl p-5 flex items-center gap-5"
          style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
        >
          <div className="relative">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{ background: "var(--chat-accent-dim)", border: "2px solid var(--chat-accent)", color: "var(--chat-accent)" }}
            >
              {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            {editing && (
              <button
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: "var(--chat-accent)" }}
              >
                <Icon name="Camera" size={10} style={{ color: "#fff" }} />
              </button>
            )}
          </div>
          <div className="flex-1">
            {editing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none font-semibold text-base border-b pb-1 mb-1"
                style={{ color: "var(--chat-text)", borderColor: "var(--chat-accent)" }}
              />
            ) : (
              <div className="font-semibold text-base mb-1" style={{ color: "var(--chat-text)" }}>
                {name}
              </div>
            )}
            <div className="text-xs flex items-center gap-1.5" style={{ color: "var(--chat-text-muted)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Активный пользователь
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3 text-center"
              style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
            >
              <Icon name={stat.icon} size={18} className="mx-auto mb-1" style={{ color: "var(--chat-accent)" }} />
              <div className="font-bold text-xl" style={{ color: "var(--chat-text)" }}>
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: "var(--chat-text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
        >
          <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--chat-text)" }}>
            Контактные данные
          </h2>
          <div className="flex flex-col gap-3">
            {[
              { label: "Email", value: email, set: setEmail, icon: "Mail" },
              { label: "Компания", value: company, set: setCompany, icon: "Building2" },
            ].map((field) => (
              <div key={field.label} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--chat-accent-dim)" }}
                >
                  <Icon name={field.icon} size={14} style={{ color: "var(--chat-accent)" }} />
                </div>
                <div className="flex-1">
                  <div className="text-xs mb-0.5" style={{ color: "var(--chat-text-muted)" }}>
                    {field.label}
                  </div>
                  {editing ? (
                    <input
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm border-b pb-0.5"
                      style={{ color: "var(--chat-text)", borderColor: "var(--chat-border)" }}
                    />
                  ) : (
                    <div className="text-sm" style={{ color: "var(--chat-text)" }}>
                      {field.value}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
        >
          <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--chat-text)" }}>
            Активность за неделю
          </h2>
          <div className="flex items-end gap-2 h-20">
            {activity.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm transition-all"
                  style={{
                    height: `${(day.msgs / maxMsgs) * 60}px`,
                    background: "var(--chat-accent)",
                    opacity: 0.7 + (day.msgs / maxMsgs) * 0.3,
                  }}
                />
                <span className="text-xs" style={{ color: "var(--chat-text-muted)" }}>
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tariff */}
        <div
          className="rounded-xl p-5 flex items-center justify-between"
          style={{ background: "var(--chat-accent-dim)", border: "1px solid var(--chat-accent)" }}
        >
          <div className="flex items-center gap-3">
            <Icon name="Zap" size={20} style={{ color: "var(--chat-accent)" }} />
            <div>
              <div className="font-semibold text-sm" style={{ color: "var(--chat-text)" }}>
                Тариф: Базовый
              </div>
              <div className="text-xs" style={{ color: "var(--chat-text-muted)" }}>
                100 сообщений в день · 5 интеграций
              </div>
            </div>
          </div>
          <button
            className="text-xs px-3 py-1.5 rounded-lg font-medium"
            style={{ background: "var(--chat-accent)", color: "#fff" }}
          >
            Улучшить
          </button>
        </div>
      </div>
    </div>
  );
}
