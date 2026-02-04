import { useMemo } from "react";
import { AppCurrency } from "@/constants/currencies";
import { twMerge } from "tailwind-merge";

interface BasicCurrencyDropdownProps {
  value: string;
  setValue?: (value: string) => void;
  options: AppCurrency[];
  className?: string;
}

const BasicCurrencyDropdown = (props: BasicCurrencyDropdownProps) => {
  const { value, setValue, className, options } = props;

  const displayedValue = useMemo(() => {
    if (!value) {
      return value;
    }

    const matched = options.find((o) => o.key === value);
    return matched ? matched.key : "__invalid__";
  }, [options, value]);

  return (
    <div>
      <select
        className={twMerge(
          "bg-zinc-200 px-3 py-1.5 leading-none rounded-full font-medium text-center",
          className,
        )}
        value={displayedValue}
        onChange={(e) => setValue && setValue(e.target.value)}
      >
        <option value="" disabled>
          Select
        </option>

        <option value="__invalid__" hidden>
          ?
        </option>

        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BasicCurrencyDropdown;
