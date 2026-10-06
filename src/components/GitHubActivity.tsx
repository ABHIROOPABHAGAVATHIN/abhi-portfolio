"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { social } from "@/data/portfolio";
import { GithubIcon } from "./Icons";
import { Reveal, SectionHeading } from "./Reveal";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
};

type State = { status: "loading" } | { status: "error" } | { status: "ok"; repos: Repo[] };

/** Public, unauthenticated GitHub REST call made from the browser. No token needed or stored. */
export function GitHubActivity() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://api.github.com/users/${social.githubUser}/repos?sort=updated&per_page=12`, {
      signal: ctrl.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<Repo[]>;
      })
      .then((all) => {
        const repos = all.filter((r) => !r.fork).slice(0, 6);
        setState(repos.length ? { status: "ok", repos } : { status: "error" });
      })
      .catch((e) => {
        if (e?.name !== "AbortError") setState({ status: "error" });
      });
    return () => ctrl.abort();
  }, []);

  return (
    <section id="github" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading index="06" eyebrow="GitHub" title="Recent public repositories." />

      {state.status === "loading" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading repositories">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-36 animate-pulse rounded-xl border border-line bg-surface/60 motion-reduce:animate-none" />
          ))}
        </div>
      )}

      {state.status === "ok" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.repos.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 0.05}>
              <a
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-line bg-surface/60 p-5 transition hover:-translate-y-0.5 hover:border-line-strong"
              >
                <div className="flex items-center justify-between">
                  <span className="truncate font-medium">{r.name}</span>
                  <ArrowUpRight size={16} aria-hidden="true" className="shrink-0 text-faint transition group-hover:text-fg" />
                </div>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                  {r.description ?? "No description provided."}
                </p>
                <div className="mt-4 flex items-center gap-4 font-mono text-xs text-faint">
                  {r.language && <span>{r.language}</span>}
                  {r.stargazers_count > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <Star size={12} aria-hidden="true" /> {r.stargazers_count}
                    </span>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      )}

      {state.status === "error" && (
        <p className="text-muted">Repositories couldn&apos;t be loaded right now. You can browse them directly on GitHub.</p>
      )}

      <Reveal className="mt-8">
        <a
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-fg link-underline"
        >
          <GithubIcon className="h-4 w-4" /> @{social.githubUser}
        </a>
      </Reveal>
    </section>
  );
}
