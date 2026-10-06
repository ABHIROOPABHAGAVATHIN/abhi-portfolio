import { ImageResponse } from "next/og";
import { personal } from "@/data/portfolio";

export const alt = `${personal.name} — ${personal.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#060607",
          backgroundImage:
            "radial-gradient(ellipse 60% 70% at 85% 0%, rgba(124,156,255,0.28), transparent)",
          color: "#f5f5f5",
        }}
      >
        <div style={{ fontSize: 26, color: "#7c9cff", letterSpacing: 6, display: "flex" }}>
          COMPUTER SCIENCE &amp; ENGINEERING
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2, display: "flex" }}>
            {personal.name}
          </div>
          <div style={{ fontSize: 38, color: "#a1a1aa", marginTop: 16, display: "flex" }}>
            {personal.title} · Spring Boot · RabbitMQ · Redis · LLM tooling
          </div>
        </div>
      </div>
    ),
    size,
  );
}
