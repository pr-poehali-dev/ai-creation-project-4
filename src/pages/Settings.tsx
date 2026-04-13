import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function Settings() {
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState(50);
  const [creativity, setCreativity] = useState(70);
  const [language, setLanguage] = useState("ru");
  const [api, setApi] = useState("");
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [saved, setSaved] = useState(false);

  const tones = [
    { value: "professional", label: "Профессиональный", icon: "Briefcase" },
    { value: "friendly", label: "Дружелюбный", icon: "Smile" },
    { value: "concise", label: "Лаконичный", icon: "AlignLeft" },
    { value: "detailed", label: "Детальный", icon: "List" },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const SectionTitle = ({ icon, title }: { icon: string; title: string }) => (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--chat-accent-dim)" }}>
        <Icon name={icon} size={14} style={{ color: "var(--chat-accent)" }} />
      </div>
      <h2 className="font-semibold text-sm" style={{ color: "var(--chat-text)" }}>
        {title}
      </h2>
    </div>
  );

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className="relative w-10 h-5 rounded-full transition-colors"
      style={{ background: checked ? "var(--chat-accent)" : "var(--chat-border)" }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
        style={{ left: checked ? "calc(100% - 18px)" : "2px" }}
      />
    </button>
  );

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      {/* Header */}
      <div
        className="px-6 py-4 border-b flex-shrink-0 flex items-center justify-between"
        style={{ borderColor: "var(--chat-border)", background: "var(--chat-surface)" }}
      >
        <h1 className="font-semibold text-base" style={{ color: "var(--chat-text)" }}>
          Параметры бота
        </h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
          style={{ background: saved ? "#059669" : "var(--chat-accent)", color: "#fff" }}
        >
          <Icon name={saved ? "Check" : "Save"} size={14} />
          {saved ? "Сохранено!" : "Сохранить"}
        </button>
      </div>

      <div className="px-6 py-6 flex flex-col gap-6">
        {/* Tone */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
        >
          <SectionTitle icon="Wand2" title="Стиль общения" />
          <div className="grid grid-cols-2 gap-2">
            {tones.map((t) => (
              <button
                key={t.value}
                onClick={() => setTone(t.value)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all text-left"
                style={{
                  background: tone === t.value ? "var(--chat-accent-dim)" : "transparent",
                  border: `1px solid ${tone === t.value ? "var(--chat-accent)" : "var(--chat-border)"}`,
                  color: tone === t.value ? "var(--chat-accent)" : "var(--chat-text-muted)",
                }}
              >
                <Icon name={t.icon} size={16} />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
        >
          <SectionTitle icon="Sliders" title="Параметры ответов" />
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm" style={{ color: "var(--chat-text)" }}>
                  Длина ответов
                </span>
                <span className="text-sm font-medium" style={{ color: "var(--chat-accent)" }}>
                  {length < 40 ? "Короткие" : length < 70 ? "Средние" : "Подробные"}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "var(--chat-accent)", background: "var(--chat-border)" }}
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm" style={{ color: "var(--chat-text)" }}>
                  Креативность
                </span>
                <span className="text-sm font-medium" style={{ color: "var(--chat-accent)" }}>
                  {creativity}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={creativity}
                onChange={(e) => setCreativity(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "var(--chat-accent)", background: "var(--chat-border)" }}
              />
            </div>
          </div>
        </div>

        {/* Language */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
        >
          <SectionTitle icon="Globe" title="Язык ответов" />
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "ru", label: "Русский", flag: "🇷🇺" },
              { value: "en", label: "English", flag: "🇬🇧" },
              { value: "auto", label: "Авто", flag: "🌐" },
            ].map((l) => (
              <button
                key={l.value}
                onClick={() => setLanguage(l.value)}
                className="px-3 py-2.5 rounded-lg text-sm transition-all"
                style={{
                  background: language === l.value ? "var(--chat-accent-dim)" : "transparent",
                  border: `1px solid ${language === l.value ? "var(--chat-accent)" : "var(--chat-border)"}`,
                  color: language === l.value ? "var(--chat-accent)" : "var(--chat-text-muted)",
                }}
              >
                {l.flag} {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* API */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
        >
          <SectionTitle icon="Plug" title="Внешние интеграции" />
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs mb-1.5 block" style={{ color: "var(--chat-text-muted)" }}>
                API ключ для внешнего сервиса
              </label>
              <div
                className="flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ background: "var(--chat-bg)", border: "1px solid var(--chat-border)" }}
              >
                <Icon name="Key" size={14} style={{ color: "var(--chat-text-muted)" }} />
                <input
                  type="password"
                  value={api}
                  onChange={(e) => setApi(e.target.value)}
                  placeholder="sk-..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: "var(--chat-text)" }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {["Notion", "Slack", "Telegram"].map((service) => (
                <button
                  key={service}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-white/5"
                  style={{ border: "1px solid var(--chat-border)", color: "var(--chat-text-muted)" }}
                >
                  <Icon name="Link" size={12} />
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
        >
          <SectionTitle icon="Settings2" title="Общие настройки" />
          <div className="flex flex-col gap-4">
            {[
              { label: "Автосохранение диалогов", desc: "Сохранять историю автоматически", checked: autoSave, toggle: () => setAutoSave(!autoSave) },
              { label: "Уведомления", desc: "Получать уведомления об ответах", checked: notifications, toggle: () => setNotifications(!notifications) },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <div className="text-sm" style={{ color: "var(--chat-text)" }}>
                    {item.label}
                  </div>
                  <div className="text-xs" style={{ color: "var(--chat-text-muted)" }}>
                    {item.desc}
                  </div>
                </div>
                <Toggle checked={item.checked} onChange={item.toggle} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
