import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navItems = [
  { to: "/", label: "Чат", icon: "MessageCircle" },
  { to: "/history", label: "История", icon: "History" },
  { to: "/settings", label: "Настройки", icon: "SlidersHorizontal" },
  { to: "/instructions", label: "Команды", icon: "BookOpen" },
  { to: "/profile", label: "Профиль", icon: "User" },
  { to: "/about", label: "О боте", icon: "Info" },
];

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--chat-bg)" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col border-r transition-all duration-300"
        style={{
          width: collapsed ? "64px" : "220px",
          background: "var(--chat-surface)",
          borderColor: "var(--chat-border)",
          minWidth: collapsed ? "64px" : "220px",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 py-5 border-b"
          style={{ borderColor: "var(--chat-border)" }}
        >
          <div
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center pulse-accent"
            style={{ background: "var(--chat-accent)" }}
          >
            <Icon name="Bot" size={16} style={{ color: "#fff" }} />
          </div>
          {!collapsed && (
            <span className="font-semibold text-sm" style={{ color: "var(--chat-text)" }}>
              AI Ассистент
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1 rounded hover:bg-white/5 transition-colors"
            style={{ color: "var(--chat-text-muted)" }}
          >
            <Icon name={collapsed ? "ChevronRight" : "ChevronLeft"} size={14} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm ${
                  isActive ? "active" : ""
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? "var(--chat-accent)" : "var(--chat-text-muted)",
              })}
            >
              <Icon name={item.icon} size={18} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Status */}
        {!collapsed && (
          <div
            className="px-4 py-3 border-t"
            style={{ borderColor: "var(--chat-border)" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs" style={{ color: "var(--chat-text-muted)" }}>
                Бот активен
              </span>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}