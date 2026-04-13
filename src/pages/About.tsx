import Icon from "@/components/ui/icon";

const FEATURES = [
  {
    icon: "Brain",
    title: "Умный диалог",
    desc: "Бот понимает контекст разговора и даёт связные ответы на протяжении всего диалога.",
  },
  {
    icon: "Plug",
    title: "Интеграции с API",
    desc: "Подключайте Notion, Slack, Telegram и другие сервисы для автоматизации задач.",
  },
  {
    icon: "History",
    title: "История диалогов",
    desc: "Все беседы сохраняются и доступны для просмотра, поиска и продолжения в любой момент.",
  },
  {
    icon: "SlidersHorizontal",
    title: "Гибкие настройки",
    desc: "Настройте стиль и тон ответов под свои нужды — профессиональный, дружелюбный или краткий.",
  },
  {
    icon: "Shield",
    title: "Приватность",
    desc: "Ваши данные и диалоги хранятся в зашифрованном виде и никогда не передаются третьим лицам.",
  },
  {
    icon: "Zap",
    title: "Быстрые ответы",
    desc: "Среднее время ответа — менее 3 секунд благодаря оптимизированной инфраструктуре.",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Задайте вопрос", desc: "Напишите запрос в свободной форме или используйте команды." },
  { step: "02", title: "Бот анализирует", desc: "AI обрабатывает запрос с учётом контекста и ваших настроек." },
  { step: "03", title: "Получите ответ", desc: "Детальный ответ с возможностью уточнения и продолжения." },
  { step: "04", title: "Действуйте", desc: "Используйте готовый результат или экспортируйте в свои сервисы." },
];

export default function About() {
  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      {/* Header */}
      <div
        className="px-6 py-4 border-b flex-shrink-0"
        style={{ borderColor: "var(--chat-border)", background: "var(--chat-surface)" }}
      >
        <h1 className="font-semibold text-base" style={{ color: "var(--chat-text)" }}>
          О боте
        </h1>
      </div>

      <div className="px-6 py-6 flex flex-col gap-6">
        {/* Hero */}
        <div
          className="rounded-xl p-6 text-center"
          style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 pulse-accent"
            style={{ background: "var(--chat-accent)" }}
          >
            <Icon name="Bot" size={32} style={{ color: "#fff" }} />
          </div>
          <h2 className="font-bold text-xl mb-2" style={{ color: "var(--chat-text)" }}>
            AI Ассистент
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--chat-text-muted)" }}>
            Интеллектуальный чат-бот для бизнеса — отвечает на вопросы, анализирует данные, автоматизирует рутину и интегрируется с вашими сервисами.
          </p>
          <div className="flex justify-center gap-4">
            {[
              { label: "Версия", value: "2.1.0" },
              { label: "Модель", value: "GPT-4o" },
              { label: "Языков", value: "30+" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="font-bold text-base" style={{ color: "var(--chat-accent)" }}>
                  {item.value}
                </div>
                <div className="text-xs" style={{ color: "var(--chat-text-muted)" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="font-semibold text-sm mb-3" style={{ color: "var(--chat-text)" }}>
            Возможности
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-4"
                style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: "var(--chat-accent-dim)" }}
                >
                  <Icon name={f.icon} size={16} style={{ color: "var(--chat-accent)" }} />
                </div>
                <div className="font-medium text-sm mb-1" style={{ color: "var(--chat-text)" }}>
                  {f.title}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--chat-text-muted)" }}>
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div>
          <h2 className="font-semibold text-sm mb-3" style={{ color: "var(--chat-text)" }}>
            Как это работает
          </h2>
          <div className="flex flex-col gap-2">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                  style={{ background: "var(--chat-accent)", color: "#fff" }}
                >
                  {step.step}
                </div>
                <div
                  className="flex-1 rounded-xl p-3"
                  style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
                >
                  <div className="font-medium text-sm mb-0.5" style={{ color: "var(--chat-text)" }}>
                    {step.title}
                  </div>
                  <div className="text-xs" style={{ color: "var(--chat-text-muted)" }}>
                    {step.desc}
                  </div>
                </div>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="absolute" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--chat-surface-2)", border: "1px solid var(--chat-border)" }}
        >
          <h2 className="font-semibold text-sm mb-3" style={{ color: "var(--chat-text)" }}>
            Технологии
          </h2>
          <div className="flex flex-wrap gap-2">
            {["OpenAI GPT-4o", "REST API", "WebSocket", "PostgreSQL", "S3 Storage", "OAuth 2.0", "Webhook"].map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 rounded-full"
                style={{ background: "var(--chat-accent-dim)", color: "var(--chat-accent)", border: "1px solid var(--chat-accent)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Support */}
        <div
          className="rounded-xl p-5 flex items-center justify-between"
          style={{ background: "var(--chat-accent-dim)", border: "1px solid var(--chat-accent)" }}
        >
          <div className="flex items-center gap-3">
            <Icon name="HeadphonesIcon" size={20} style={{ color: "var(--chat-accent)" }} />
            <div>
              <div className="font-semibold text-sm" style={{ color: "var(--chat-text)" }}>
                Нужна помощь?
              </div>
              <div className="text-xs" style={{ color: "var(--chat-text-muted)" }}>
                Служба поддержки работает 24/7
              </div>
            </div>
          </div>
          <button
            className="text-xs px-3 py-1.5 rounded-lg font-medium"
            style={{ background: "var(--chat-accent)", color: "#fff" }}
          >
            Написать
          </button>
        </div>
      </div>
    </div>
  );
}
