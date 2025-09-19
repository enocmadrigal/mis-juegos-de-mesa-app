export interface Game {
  id: number;
  rankValue: number;
  name: string;
  publisher: string;
  categories: string[];
  players: string; // Ejemplo: "2-4"
  duration: string; // Ejemplo: "30-60 min"
  mode: string; // "Individual" o "En equipos"
  description: string;
  rules: string;
  videoUrl: string;
  mainImage: string;
  secondaryImages: string[];
  purchaseOrder: number; // Orden de compra, entero único consecutivo
  acquisitionDate: string; // Fecha de adquisición, formato "dd/mm/yyyy"
  aproxDate: boolean; // Indica si la fecha es aproximada
}