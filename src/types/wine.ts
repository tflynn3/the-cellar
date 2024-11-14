export interface WineRating {
  rating: number;
  dateDrank: string;
  wouldBuyAgain: boolean;
  foodPairings?: string[];
  experience?: string;
}

export interface Wine {
  id: string;
  name: string;
  image: string;
  style: string;
  grapes: string[];
  location: string;
  vendor: string;
  purchaseDate: string;
  drinkBy?: string;
  price: number;
  notes?: string;
  consumed?: WineRating;
}