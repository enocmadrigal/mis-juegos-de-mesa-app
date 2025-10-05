export interface Game {
  id: number;
  purchaseOrder: number;
  name: string;
  publisher: string;
  categories: string[];
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