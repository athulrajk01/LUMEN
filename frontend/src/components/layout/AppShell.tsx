import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-950 text-zinc-100">
      <Sidebar collapsed={sidebarCollapsed} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto bg-zinc-950">
          <div className="mx-auto max-w-[1600px] px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}