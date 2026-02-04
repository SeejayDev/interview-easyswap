export interface AppCurrency {
  key: string;
  usdRate: number;
}

export const CURRENCIES: AppCurrency[] = [
  { key: "HKD", usdRate: 7.798926 },
  { key: "AUD", usdRate: 1.487089 },
  { key: "MYR", usdRate: 4.375 },
  { key: "GBP", usdRate: 0.761538 },
  { key: "EUR", usdRate: 0.899038 },
  { key: "IDR", usdRate: 15538.905259 },
  { key: "NZD", usdRate: 1.625053 },
  { key: "CNY", usdRate: 7.1369 },
  { key: "CZK", usdRate: 22.549 },
  { key: "AED", usdRate: 3.672815 },
];
