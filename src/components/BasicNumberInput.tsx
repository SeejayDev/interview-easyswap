import currency from "currency.js";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

interface BasicNumberInputProps {
  value: string;
  setValue?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function BasicNumberInput(props: BasicNumberInputProps) {
  const { value, setValue, className, placeholder } = props;

  function formatRawInput(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    const rawValue = e.target.value.replaceAll(",", "");

    // modified from https://stackoverflow.com/posts/70342439/revisions
    const maxDecimals = 2;
    const [integer, fractional] = rawValue.split(".");

    const trimmedInteger = integer.replace(/\b0+/g, "");
    const preferredInteger =
      integer.length > 0
        ? trimmedInteger.length > 0
          ? trimmedInteger
          : "0"
        : "";

    const trimmedValue = [preferredInteger, fractional]
      .filter((data) => typeof data === "string")
      .join(".")
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1")
      .replace(
        new RegExp(`([0-9]{0,99}(.[0-9]{0,${maxDecimals}})?).*`, "g"),
        "$1",
      );

    const [int, decimal] = trimmedValue.split(".");
    const formattedInteger = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const finalValue =
      decimal !== undefined
        ? `${formattedInteger}.${decimal}`
        : formattedInteger;

    setValue && setValue(finalValue);
  }

  return (
    <input
      type="text"
      value={value}
      onChange={formatRawInput}
      className={twMerge("outline-none", className)}
      placeholder={placeholder}
    />
  );
}
