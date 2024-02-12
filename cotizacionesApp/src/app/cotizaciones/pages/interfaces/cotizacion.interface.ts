interface CurrencyConvertResponse {
  amount: number;
  base: string;
  rates: { [key: string]: number };
  ratesKey?: string[];
  ratesValue?: number[];
}
