// Client logos, trimmed to their edges and set in ink (--color-ink) to keep
// the site to one colour. `height` is the display height in px, tuned per
// logo so each reads at a similar visual weight beside a tile title.
export type ClientLogo = { src: string; width: number; height: number };

const CLIENT_LOGOS: Record<string, { src: string; intrinsic: [number, number]; height: number }> = {
  Amazon: { src: "/images/clients/amazon.png", intrinsic: [1059, 357], height: 20 },
  Recur: { src: "/images/clients/recur.png", intrinsic: [592, 161], height: 20 },
  "Nytro.ai": { src: "/images/clients/nytro.png", intrinsic: [800, 250], height: 20 },
  Honeywell: { src: "/images/clients/honeywell.png", intrinsic: [799, 160], height: 22 },
};

/** The logo for a client, sized for display, or undefined if there isn't one. */
export function getClientLogo(client?: string): ClientLogo | undefined {
  const logo = client ? CLIENT_LOGOS[client] : undefined;
  if (!logo) return undefined;
  const [w, h] = logo.intrinsic;
  return { src: logo.src, height: logo.height, width: Math.round((w / h) * logo.height) };
}
