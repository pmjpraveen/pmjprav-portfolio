import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The share card that appears when a link is pasted into Slack, LinkedIn,
// iMessage and so on. It repeats the site's own greeting: the photo pill,
// then one line in Switzer on the light canvas. The fonts are TTF copies of
// the site's Switzer files, because the image renderer can't read WOFF2.

export const OG_SIZE = { width: 1200, height: 630 };

const INK = "#1c1c1c";
const SMOKE = "#737373";
const CANVAS = "#fcfcfb";

const asset = (name: string) => readFile(join(process.cwd(), "app/_og", name));

type CardProps = {
  /** Small line above the headline, e.g. "Amazon · Developer Tools". */
  eyebrow?: string;
  headline: string;
};

export async function renderCard({ eyebrow, headline }: CardProps) {
  const [regular, medium, photo] = await Promise.all([
    asset("Switzer-Regular.ttf"),
    asset("Switzer-Medium.ttf"),
    asset("photo.png"),
  ]);
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CANVAS,
          color: INK,
          padding: "72px 80px",
          fontFamily: "Switzer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 30, background: "#f1f2f4", alignSelf: "flex-start" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG, not the DOM */}
          <img src={photoSrc} alt="" width={88} height={88} style={{ borderRadius: 18, objectFit: "cover", objectPosition: "top" }} />
          <div style={{ display: "flex", alignItems: "center", height: 88, padding: "0 34px", borderRadius: 999, background: "#ffffff", fontSize: 34, letterSpacing: -0.7, color: "#2a2a2a" }}>
            Hi! I’m Praveenkumar
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {eyebrow ? <div style={{ display: "flex", fontSize: 28, color: SMOKE }}>{eyebrow}</div> : null}
          <div style={{ display: "flex", fontSize: 60, fontWeight: 500, lineHeight: 1.12, letterSpacing: -1.2, maxWidth: 1000 }}>
            {headline}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: SMOKE, borderTop: "1px solid #e3e3e0", paddingTop: 24 }}>
          <div style={{ display: "flex" }}>Product designer & design engineer</div>
          <div style={{ display: "flex" }}>Bengaluru, India</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Switzer", data: regular, weight: 400, style: "normal" },
        { name: "Switzer", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
