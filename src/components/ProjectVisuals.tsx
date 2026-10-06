import type { ProjectVisual } from "@/data/portfolio";

/**
 * Illustrative UI/architecture mockups drawn from each project's description.
 * They contain no metrics or sample data beyond what the resume states.
 */

function Node({
  x,
  y,
  w = 112,
  label,
  sub,
  accent,
}: {
  x: number;
  y: number;
  w?: number;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={46}
        rx={9}
        fill="#0c0c0e"
        stroke={accent ? "#7c9cff" : "rgba(255,255,255,0.14)"}
        strokeOpacity={accent ? 0.7 : 1}
      />
      <text x={x + w / 2} y={y + (sub ? 20 : 28)} textAnchor="middle" fill="#f5f5f5" fontSize="12" fontWeight="600">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + 35} textAnchor="middle" fill="#71717a" fontSize="10">
          {sub}
        </text>
      )}
    </g>
  );
}

function Edge({ d }: { d: string }) {
  return <path d={d} fill="none" stroke="#7c9cff" strokeOpacity={0.55} strokeWidth={1.4} className="flow-line" markerEnd="url(#fv-arrow)" />;
}

function FinVigil() {
  return (
    <svg viewBox="0 0 520 320" role="img" aria-label="FinVigil architecture: API to RabbitMQ to Drools decision engine to PostgreSQL, with Redis AML screening" className="h-full w-full">
      <defs>
        <marker id="fv-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#7c9cff" fillOpacity="0.8" />
        </marker>
      </defs>
      <Edge d="M124 62 H202" />
      <Edge d="M316 62 H354" />
      <Edge d="M426 108 V148" />
      <Edge d="M124 173 H202" />
      <Edge d="M316 173 H354" />
      <Node x={12} y={39} w={112} label="Loan API" sub="Spring Boot" />
      <Node x={204} y={39} label="RabbitMQ" sub="decision events" accent />
      <Node x={356} y={39} w={140} label="Drools engine" sub="DTI · score · employment" />
      <Node x={12} y={150} w={112} label="Transactions" sub="AML screening" />
      <Node x={204} y={150} label="Redis" sub="sliding window" accent />
      <Node x={356} y={150} w={140} label="PostgreSQL" sub="loans · AML alerts · audit" />
      <text x="12" y="108" fill="#71717a" fontSize="10" fontFamily="monospace">
        async credit decisioning
      </text>
      <text x="12" y="236" fill="#71717a" fontSize="10" fontFamily="monospace">
        real-time structuring detection
      </text>
      <text x="12" y="296" fill="#71717a" fontSize="10" fontFamily="monospace">
        traceable rule triggers · full audit trail
      </text>
    </svg>
  );
}

function LogSage() {
  const rows = [
    { t: "INFO", c: "text-faint", m: "request completed" },
    { t: "INFO", c: "text-faint", m: "connection pool ok" },
    { t: "WARN", c: "text-amber-300/80", m: "retry attempt on upstream" },
    { t: "ERROR", c: "text-red-300/90", m: "timeout waiting for response", hot: true },
    { t: "INFO", c: "text-faint", m: "health check passed" },
  ];
  return (
    <div className="grid h-full grid-cols-5 gap-3 p-4 font-mono text-[11px] sm:text-xs">
      <div className="col-span-3 rounded-lg border border-line bg-bg p-3">
        <p className="mb-2 text-[10px] uppercase tracking-widest text-faint">log stream</p>
        <ul className="space-y-1">
          {rows.map((r, i) => (
            <li
              key={i}
              className={`flex gap-2 rounded px-1.5 py-1 ${r.hot ? "bg-red-400/10 ring-1 ring-red-400/30" : ""}`}
            >
              <span className={`w-10 shrink-0 ${r.c}`}>{r.t}</span>
              <span className="truncate text-muted">{r.m}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-2 flex flex-col gap-3">
        <div className="rounded-lg border border-accent/40 bg-accent-soft p-3">
          <p className="mb-1.5 text-[10px] uppercase tracking-widest text-accent">AI explanation</p>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded bg-white/15" />
            <div className="h-1.5 w-5/6 rounded bg-white/15" />
            <div className="h-1.5 w-2/3 rounded bg-white/15" />
          </div>
        </div>
        <div className="rounded-lg border border-line bg-bg p-3">
          <p className="mb-1.5 text-[10px] uppercase tracking-widest text-faint">fallback</p>
          <p className="text-muted">rule-based</p>
          <div className="mt-2 flex gap-1.5">
            <span className="rounded border border-line px-1.5 py-0.5 text-[10px] text-muted">PDF</span>
            <span className="rounded border border-line px-1.5 py-0.5 text-[10px] text-muted">CSV</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const bars = [38, 62, 48, 80, 56, 90, 70];
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 p-4">
      <div className="grid grid-cols-3 gap-3">
        {["KPI", "KPI", "KPI"].map((k, i) => (
          <div key={i} className="rounded-lg border border-line bg-bg p-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-faint">{k}</p>
            <div className="mt-2 h-2 w-2/3 rounded bg-accent/40" />
          </div>
        ))}
      </div>
      <div className="flex items-end gap-2 rounded-lg border border-line bg-bg p-4">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-accent/20 to-accent/60" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export function ProjectVisualPanel({ kind }: { kind: ProjectVisual }) {
  return (
    <div
      className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-line bg-surface sm:aspect-[16/10]"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative h-full w-full p-2 sm:p-4">
        {kind === "finvigil" && <FinVigil />}
        {kind === "logsage" && <LogSage />}
        {kind === "dashboard" && <Dashboard />}
      </div>
    </div>
  );
}
