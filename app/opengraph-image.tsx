import { OG_SIZE, renderCard } from "./_og/card";

export const alt = "Praveenkumar, product designer and design engineer: I design the software people use all day at work.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderCard({
    headline: "I design the software people use all day at work, and make the complicated parts feel obvious.",
  });
}
