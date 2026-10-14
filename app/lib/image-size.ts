import fs from "node:fs";
import path from "node:path";

/** Reads intrinsic size from a PNG or WebP header in /public (server-only). Returns undefined for anything else. */
export function getImageSize(src: string): { width: number; height: number } | undefined {
  try {
    const b = fs.readFileSync(path.join(process.cwd(), "public", src)).subarray(0, 32);
    if (b.toString("ascii", 1, 4) === "PNG") {
      return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
    }
    if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
      const kind = b.toString("ascii", 12, 16);
      if (kind === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
      if (kind === "VP8X") return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
      if (kind === "VP8L") {
        const bits = b.readUInt32LE(21);
        return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
      }
    }
  } catch {}
  return undefined;
}
