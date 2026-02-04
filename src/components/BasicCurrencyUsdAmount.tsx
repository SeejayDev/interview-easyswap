import { AppCurrency } from "@/constants/currencies";
import currency from "currency.js";

interface DisplayProps {
  currency: AppCurrency;
  amount: number | string;
}

export function BasicCurrencyUsdAmount(props: DisplayProps) {
  return (
    <span>
      {currency(props.amount).divide(props.currency.usdRate).format()}
    </span>
  );
}
