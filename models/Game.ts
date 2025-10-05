import type { Category } from "../data/categories";

export interface Game {
  id: number;
  purchaseOrder: number;
  name: string; //- Esto es un string[] y no un enum
  publisher: string;
  categories: Category[];
  minPlayers: number;
  maxPlayers: number;
  averageDuration: number; // minutos
  mode: string;
  description: string;
  rules: string;
  videoUrl: string;
  mainImage: any;
  secondaryImages: any[];
  rankValue: number;
  acquisitionDate: string;
  aproxDate: boolean;
}