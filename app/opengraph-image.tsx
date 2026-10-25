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
          background: "#131313",
          color: "#efe8da",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 3, color: "#b4ad9f" }}>PORTFOLIO</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 148, lineHeight: 1, letterSpacing: -5 }}>Praveenkumar</div>
          <div style={{ display: "flex", fontSize: 44, marginTop: 28, color: "#ec5a48" }}>
            Product designer · Developer tools and enterprise software
          </div>
        </div>
      </div>
    ),
    size,
  );
}
