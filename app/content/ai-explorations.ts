export type AiExploration = {
  slug: string;
  title: string;
  description: string;
  /** Short labels, e.g. "Voice", "Prototype". */
  tags?: string[];
  /** Where to see it, if it is public. */
  href?: string;
};

// Nothing is published here yet. Add an entry per exploration and the homepage
// section lights one lamp for each; until then it shows an honest empty state.
export const aiExplorations: AiExploration[] = [];
