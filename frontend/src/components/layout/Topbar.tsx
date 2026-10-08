import { Bell, Search, Sun, Moon, User, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

export function Topbar() {
  const [isDark, setIsDark] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-zinc-800 bg-zinc-950/80 px-6 backdrop-blur">
      {/* Search */}
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search buildings, records, anomalies..."
            className={cn(
              "w-full rounded-md border border-zinc-800 bg-zinc-900/50 py-2 pl-10 pr-3 text-sm",
              "text-zinc-100 placeholder:text-zinc-500",
              "focus:border-teal-500/50 focus:outline-none focus:ring-1 focus:ring-teal-500/50",
              "transition-colors"
            )}
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-md p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          title="Toggle theme"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button
          className="relative rounded-md p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-teal-500" />
        </button>

        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 rounded-md p-1 pl-2 pr-3 text-sm text-zinc-300 transition-colors hover:bg-zinc-800"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500/20 text-xs font-medium text-teal-400">
              AR
            </div>
            <span className="hidden sm:inline">Athul Raj</span>
          </button>

          {userMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setUserMenuOpen(false)}
              />
              <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-md border border-zinc-800 bg-zinc-900 shadow-xl">
                <div className="border-b border-zinc-800 p-3">
                  <div className="text-sm font-medium text-zinc-100">Athul Raj</div>
                  <div className="text-xs text-zinc-500">athulrajk100@gmail.com</div>
                </div>
                <div className="p-1">
                  <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800">
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                </div>
                <div className="border-t border-zinc-800 p-1">
                  <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-500/10">
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}