import { AppCurrency } from "@/constants/currencies";
import BasicCurrencyDropdown from "./BasicCurrencyDropdown";
import { BasicCurrencyUsdAmount } from "./BasicCurrencyUsdAmount";
import BasicNumberInput from "./BasicNumberInput";
import { useMemo } from "react";

interface CurrencyAmountInputProps {
  label?: string;
  options: AppCurrency[];
  currencyKey: string;
  setCurrencyKey: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
}

export function BasicCurrencyAndAmountInput(props: CurrencyAmountInputProps) {
  const { label, options, currencyKey, setCurrencyKey, amount, setAmount } =
    props;

  const selectedCurrency = useMemo(() => {
    return options.find((o) => o.key === currencyKey);
  }, [currencyKey, options]);

  return (
    <div className="bg-white rounded-lg p-3 space-y-2">
      {label && <p className="font-medium text-sm">{label}</p>}

      <div className="flex items-center">
        <BasicCurrencyDropdown
          value={currencyKey}
          setValue={setCurrencyKey}
          options={options}
        />

        <div className="flex-1 min-w-0 flex flex-col items-end">
          <BasicNumberInput
            value={amount}
            setValue={(v) => setAmount(v)}
            className="text-right text-lg font-bold"
            placeholder="0.00"
          />

          {selectedCurrency && (
            <div className="text-xs">
              <BasicCurrencyUsdAmount
                currency={selectedCurrency}
                amount={amount}
              />
            </div>
          )}
        </div>
      </div>

      {currencyKey && !selectedCurrency && (
        <div className="text-red-800 text-xs mt-1.5">
          Invalid currency selected. Please select another option.
        </div>
      )}
    </div>
  );
}
