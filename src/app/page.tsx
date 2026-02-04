"use client";
import { useEffect, useMemo, useState } from "react";
import { CURRENCIES } from "../constants/currencies";
import { BasicCurrencyUsdAmount } from "@/components/BasicCurrencyUsdAmount";
import { AlertTriangleIcon, ArrowUpDownIcon } from "lucide-react";
import { useSearchQueryState } from "@/utils/hooks/useSearchQueryState";
import { BasicCurrencyAndAmountInput } from "@/components/BasicCurrencyAndAmountInput";
import { convertCurrencyAmount } from "@/utils/currency/convert-amount";

export default function Home() {
  const allCurrencyOptions = useMemo(() => CURRENCIES, []);

  const [fromKey, setFromKey] = useSearchQueryState("from", "");
  const [toKey, setToKey] = useSearchQueryState("to", "");

  const fromCurrency = useMemo(() => {
    return allCurrencyOptions.find((c) => c.key === fromKey);
  }, [fromKey]);

  const toCurrency = useMemo(() => {
    return allCurrencyOptions.find((c) => c.key === toKey);
  }, [toKey]);

  const [userInput, setUserInput] = useState({ source: "from", amount: "" });

  const currencyOptions = useMemo(() => {
    // if (fromKey === toKey) {
    //   const otherOptions = allCurrencyOptions.filter((o) => o.key !== fromKey);

    //   if (userInput.source === "from") {
    //     return { from: allCurrencyOptions, to: otherOptions };
    //   } else {
    //     return { from: otherOptions, to: allCurrencyOptions };
    //   }
    // }
    let fromCurrencyKey = fromKey;
    let toCurrencyKey = toKey;

    if (fromCurrencyKey === toCurrencyKey) {
      if (userInput.source === "from") {
        toCurrencyKey = "";
      } else {
        fromCurrencyKey = "";
      }
    }

    const fromOptions = allCurrencyOptions.filter(
      (o) => o.key !== toCurrencyKey,
    );
    const toOptions = allCurrencyOptions.filter(
      (o) => o.key !== fromCurrencyKey,
    );
    return { from: fromOptions, to: toOptions };
  }, [fromKey, toKey]);

  const output = useMemo(() => {
    if (!fromCurrency || !toCurrency || !userInput.amount) {
      return undefined;
    }

    if (userInput.source === "from") {
      const toAmount = convertCurrencyAmount({
        from: fromCurrency,
        to: toCurrency,
        amount: userInput.amount,
      });

      return {
        amount: toAmount.multiply(0.99).format({ symbol: "" }),
        fee: toAmount.multiply(0.01).format({ symbol: "" }),
      };
    } else {
      const fromAmount = convertCurrencyAmount({
        from: toCurrency,
        to: fromCurrency,
        amount: userInput.amount,
      });

      return {
        amount: fromAmount.divide(0.99).format({ symbol: "" }),
        fee: fromAmount.divide(0.01).format({ symbol: "" }),
      };
    }
  }, [userInput, fromCurrency, toCurrency]);

  const formValues = useMemo(() => {
    if (userInput.source === "from") {
      return { from: userInput.amount, to: output?.amount ?? "" };
    } else {
      return { from: output?.amount ?? "", to: userInput.amount };
    }
  }, [userInput, output]);

  function handleSwapDirection() {
    setFromKey(toKey);
    setToKey(fromKey);

    const newSource = userInput.source === "from" ? "to" : "from";
    setUserInput({ source: newSource, amount: userInput.amount });
  }

  useEffect(() => {
    // if (fromCurrency !== to)
  }, [fromKey, toKey]);

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-100 text-black font-sans">
      <main className="w-full max-w-lg py-16 px-4">
        <h1 className="text-center font-semibold text-3xl">
          Swap between Currencies
        </h1>

        <div className="border border-zinc-300 rounded-lg p-3 mt-8">
          <BasicCurrencyAndAmountInput
            label="From"
            options={currencyOptions.from}
            currencyKey={fromKey}
            setCurrencyKey={setFromKey}
            amount={formValues.from}
            setAmount={(v) => setUserInput({ source: "from", amount: v })}
          />

          <div className="relative flex items-center justify-center h-2">
            <button
              onClick={handleSwapDirection}
              className="absolute px-4 py-1.5 bg-white border-4 border-zinc-200 rounded-full hover:scale-110 transition-transform cursor-pointer"
            >
              <ArrowUpDownIcon size={16} />
            </button>
          </div>

          <BasicCurrencyAndAmountInput
            label="To"
            options={currencyOptions.to}
            currencyKey={toKey}
            setCurrencyKey={setToKey}
            amount={formValues.to}
            setAmount={(v) => setUserInput({ source: "to", amount: v })}
          />

          {fromKey === toKey && (
            <div className="mt-3 bg-yellow-300/30 rounded-lg p-3 flex items-center">
              <AlertTriangleIcon className="size-5 text-yellow-600 shrink-0" />
              <span className="text-xs sm:text-sm font-medium ml-2">
                Swapping to same currency. Change either value to continue.
              </span>
            </div>
          )}

          <div className="mt-3 px-2">
            <div className="flex items-center justify-between text-sm">
              <p className="font-medium">Fees (1%)</p>

              {output ? (
                <div>
                  <span className="font-bold">
                    {toCurrency?.key}&nbsp;
                    {output.fee}
                  </span>
                  {toCurrency && (
                    <span>
                      <span>&nbsp;</span>
                      <BasicCurrencyUsdAmount
                        currency={toCurrency}
                        amount={output.fee}
                      />
                    </span>
                  )}
                </div>
              ) : (
                <span>-</span>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
