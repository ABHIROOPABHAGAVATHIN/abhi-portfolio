"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, personal } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-line bg-bg/75 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#home"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-7 w-7 place-items-center rounded-md border border-line-strong bg-surface font-mono text-[11px] text-accent">
            {personal.initials}
          </span>
          <span className="hidden sm:inline">{personal.name}</span>
          <span className="sm:hidden">{personal.shortName}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? "true" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm transition-colors",
                  active === n.id ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {n.label}
                {active === n.id && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute inset-x-3 -bottom-px h-px bg-accent"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={personal.resumeFile}
            download={personal.resumeDownloadName}
            className="hidden items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-1.5 text-sm text-fg transition hover:border-accent/60 hover:bg-surface-2 sm:inline-flex"
          >
            <Download size={14} aria-hidden="true" /> Resume
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md border border-line text-fg md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg/95 px-5 pb-10 pt-4 md:hidden"
          >
            <ul className="flex flex-col">
              {nav.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                >
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line py-4 text-2xl font-medium tracking-tight"
                  >
                    {n.label}
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={personal.resumeFile}
              download={personal.resumeDownloadName}
              className="mt-8 flex h-12 items-center justify-center gap-2 rounded-full bg-fg font-medium text-bg"
            >
              <Download size={16} aria-hidden="true" /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
