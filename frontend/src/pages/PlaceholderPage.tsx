import { Construction, ArrowRight } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-500/10">
              <Construction className="h-6 w-6 text-teal-400" />
            </div>
            <div className="flex-1">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-400">
                Coming Soon
              </div>
              <h1 className="mb-2 text-2xl font-semibold text-zinc-100">{title}</h1>
              <p className="mb-6 text-sm text-zinc-400">
                {description ||
                  "This section of LUMEN is currently being built. The full functionality — data views, charts, filters, and actions — will be available here."}
              </p>

              <div className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
                <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Planned features
                </div>
                <ul className="space-y-1.5 text-sm text-zinc-400">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5 text-teal-400" />
                    Data ingestion and validation
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5 text-teal-400" />
                    Interactive visualizations
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5 text-teal-400" />
                    Filtering and comparison tools
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5 text-teal-400" />
                    Export and reporting
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}