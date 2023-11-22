export interface ApiCounty {
  name: {
    common: string;
    official: string;
  };
  borders: string[];
  capital?: string[];
  flags: {
    alt: string;
    svg: string;
  };
  region: string;
  population: number;
  currencies: {
    [key: string]: Money;
  };
  timezones: string[];
}

export interface Money {
  name: string;
  symbol: string;
}