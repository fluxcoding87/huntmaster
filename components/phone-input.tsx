"use client";

import PhoneInputComponent from "react-phone-number-input";

import "react-phone-number-input/style.css";

interface PhoneInputProps {
  onChange: (value: string | undefined) => void;
  value: string | undefined;
}

export const PhoneInput = ({ onChange, value }: PhoneInputProps) => {
  return (
    <div className="mt-8">
      <PhoneInputComponent
        value={value}
        onChange={onChange}
        placeholder="Enter phone number"
        defaultCountry="IN"
        international
        className="border-2 rounded-md px-4 focus-visible:ring-transparent"
      />
    </div>
  );
};
