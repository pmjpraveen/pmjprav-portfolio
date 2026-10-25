"use client";

import dynamic from "next/dynamic";
import type { SceneKind } from "./Scene3D";

// Three.js is only fetched when a scene is actually on a page the visitor reaches.
const Scene = dynamic(() => import("./Scene3D"), { ssr: false });

/** A 3D object in a sized box. The box exists immediately, so nothing shifts when the scene loads. */
/** `word` is the text the lampboard lights, letter by letter (lamps only). */
export function Scene3D({ kind, className, word }: { kind: SceneKind; className?: string; word?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <Scene kind={kind} word={word} className="absolute inset-0" />
    </div>
  );
}
