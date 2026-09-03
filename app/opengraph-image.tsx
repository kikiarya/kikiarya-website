import { ImageResponse } from "next/og";

export const alt = "Kikiarya — LLM Agents, Post-training, and AI Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "72px 80px",
          background: "linear-gradient(150deg, #fff7f8 0%, #f9e7ec 58%, #f4dce4 100%)",
          color: "rgba(82, 58, 68, 0.94)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#a9476d",
            fontFamily: "Georgia, serif",
          }}
        >
          Kikiarya
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 80 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              fontFamily: "Georgia, serif",
              fontWeight: 400,
            }}
          >
            LLM Agents, Post-training, and AI Systems
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              marginTop: 12,
              padding: "10px 22px",
              borderRadius: 999,
              border: "1px solid rgba(177, 79, 113, 0.26)",
              background: "rgba(255, 250, 251, 0.86)",
              fontSize: 20,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#a9476d",
            }}
          >
            NeurIPS 2026 · Under Review
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
