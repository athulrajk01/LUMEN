import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import { navigation } from "../../config/navigation";

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col border-r border-zinc-800 bg-zinc-950 text-zinc-100",
        "transition-all duration-200 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-zinc-800 px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500 text-sm font-bold text-white">
          L
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">LUMEN</span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500">
              Energy Intelligence
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 scrollbar-thin">
        {navigation.map((section) => (
          <div key={section.title} className="mb-4">
            {!collapsed && (
              <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                {section.title}
              </div>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      className={({ isActive }) =>
                        cn(
                          "group flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                          "hover:bg-zinc-800/60 hover:text-white",
                          isActive
                            ? "bg-teal-500/10 text-teal-400 font-medium"
                            : "text-zinc-400"
                        )
                      }
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className="rounded-full bg-teal-500/20 px-1.5 py-0.5 text-[10px] font-medium text-teal-400">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-zinc-800 px-4 py-3">
          <div className="text-[10px] uppercase tracking-wider text-zinc-600">
            v0.1.0 · Development
          </div>
        </div>
      )}
    </aside>
  );
}