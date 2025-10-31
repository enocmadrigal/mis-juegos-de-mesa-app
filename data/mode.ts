export const ALL_MODES = [
  "Competitivo",
  "Equipos",
  "Cooperativo",
  "Risas",
  "Conversacional",
  "Individual"
  // ...agrega todas las que uses...
] as const;
export type Mode = typeof ALL_MODES[number];
