import { TextFieldProps } from "@mui/material";
import { MuiTelInput, MuiTelInputInfo } from "mui-tel-input";
import { useState } from "react";
import { WP_INPUT_LABEL_PROPS, WP_INPUT_PROPS, WP_INPUT_SX } from "../themes/wordpressTheme";

export type PhoneNumberInputProps = TextFieldProps & {
  isValid: (isValid: boolean) => void;
  label: string;
  onInputChange: (data: string) => void;
  value: string;
};

//TODO: OnError callback
//TODO: Remove isValid in favor of onError
export default function PhoneNumberInput({
  isValid,
  label,
  onInputChange,
  value,
  required = false,
  ...props
}: PhoneNumberInputProps) {
  const [input, setInput] = useState({
    error: false,
    touched: false,
    valid: false,
  });

  const [internalValue, setInternalValue] = useState<string>(value);

  const validate = (val: string) => {
    return val.replace(/\D/g, "").length === 10;
  };

  const handleOnChange = (value: string, info: MuiTelInputInfo) => {
    if (value.length === 4 && (value === "+1 1" || value === "+1 0")) {
      return;
    }
    setInternalValue(value);
    onInputChange(info.nationalNumber as string);
    const touched = value !== "";
    isValid(validate(info.nationalNumber as string));
    setInput({
      ...input,
      touched: touched,
    });
  };

  const onInputFocus = () => {
    setInput({ ...input, error: false });
  };

  const handleBlur = () => {
    const valid = validate(value);
    setInput({
      ...input,
      error: !required && value === "" ? false : !valid && input.touched,
    });
  };

  return (
    <MuiTelInput
      {...props}
      disableDropdown
      forceCallingCode
      data-testid="phone-number-input"
      defaultCountry="US"
      error={input.error}
      inputProps={{ maxLength: "12" }}
      label={label}
      margin="normal"
      onlyCountries={["US"]}
      size="small"
      value={internalValue}
      onBlur={handleBlur}
      onChange={handleOnChange}
      onFocus={onInputFocus}
      InputProps={{
        sx: WP_INPUT_PROPS,
      }}
      sx={WP_INPUT_SX}
      InputLabelProps={WP_INPUT_LABEL_PROPS}
      FormHelperTextProps={WP_INPUT_LABEL_PROPS}
    />
  );
}
