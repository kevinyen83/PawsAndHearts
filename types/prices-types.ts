export interface Price {
  id: string;
  unit_amount: number;
}

export interface PricesState {
  prices: Price[];
}
