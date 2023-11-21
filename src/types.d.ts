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
    [key: string]: {
      name: string;
      symbol: string;
    }
  };
  timezones: string[];
}