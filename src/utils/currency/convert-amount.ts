import { AppCurrency } from "@/constants/currencies";
import currency from "currency.js";

export function convertCurrencyAmount(params: {
  from: AppCurrency;
  to: AppCurrency;
  amount: string;
}) {
  const { from, to, amount } = params;
  return currency(amount).divide(from.usdRate).multiply(to.usdRate);
}
