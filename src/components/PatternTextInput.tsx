import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import {
  WP_AND_INPUT_PROPS,
  WP_INPUT_LABEL_PROPS,
  WP_INPUT_PROPS,
  WP_INPUT_SX,
} from "../themes/wordpressTheme";

export type PatternTextInputProps = PatternFormatProps & {
  endAdornment?: string;
  error?: boolean;
  format?: string;
  helperText?: string;
  id: string;
  isValid: (valid: boolean) => void;
  label: string;
  maxLength?: number;
  name: string;
  onChange: (val: string) => void;
  required?: boolean;
  value: string;
};

export default function PatternTextInput({
  id,
  onChange,
  required = false,
  endAdornment = "#",
  format = "#####",
  maxLength = format.length,
  name,
  isValid,
  label,
  helperText,
  value,
}: PatternTextInputProps) {
  const [input, setInput] = useState({
    error: false,
    touched: false,
    valid: false,
    value: value,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    const valid = validate(val);
    const touched = val !== "";
    setInput({
      ...input,
      touched: touched,
      valid: valid,
      value: val,
    });
    isValid(valid);
    onChange(val);
  };

  const onInputFocus = () => {
    setInput({ ...input, error: false });
  };

  const handleBlur = () => {
    setInput({
      ...input,
      error: !input.valid && input.touched,
    });
  };

  const validate = (val: string) => {
    return val.length == format.length;
  };

  return (
    <PatternFormat
      fullWidth
      customInput={TextField}
      data-testid="pattern-text-input"
      error={input.error}
      format={format}
      FormHelperTextProps={WP_INPUT_LABEL_PROPS}
      helperText={helperText}
      id={id}
      InputLabelProps={WP_INPUT_LABEL_PROPS}
      label={label}
      margin="dense"
      maxLength={maxLength}
      name={name}
      required={required}
      size="small"
      style={WP_INPUT_PROPS}
      sx={WP_INPUT_SX}
      value={input.value.trim()}
      InputProps={{
        endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
        sx: WP_AND_INPUT_PROPS,
      }}
      onBlur={handleBlur}
      onChange={handleOnChange}
      onFocus={onInputFocus}
    />
  );
}
