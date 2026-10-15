import { ImageResponse } from "next/og";

export const alt = "Praveenkumar, AI-native product designer and design engineer";
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
          background: "#fdfcfc",
          color: "#000000",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 3, color: "#777169" }}>PORTFOLIO</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 148, lineHeight: 1, letterSpacing: -5 }}>Praveenkumar</div>
          <div style={{ display: "flex", fontSize: 44, marginTop: 28, color: "#777169" }}>
            AI-native product designer and design engineer
          </div>
        </div>
      </div>
    ),
    size,
  );
}
