import { InputAdornment, TextField } from "@mui/material";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { WP_INPUT_LABEL_PROPS, WP_INPUT_SX } from "../themes/wordpressTheme";

export type CurrencyInputProps = NumericFormatProps & {
  helperText?: string;
  id: string;
  label: string;
  onChange: (val: string) => void;
};

export default function CurrencyInput({
  id,
  value,
  label,
  helperText = " ",
  autoFocus,
  onChange,
  disabled,
  required = false,
  style,
}: CurrencyInputProps) {
  return (
    <NumericFormat
      fullWidth
      thousandSeparator
      autoFocus={autoFocus}
      customInput={TextField}
      data-testid="currency-input"
      decimalScale={2}
      disabled={disabled}
      FormHelperTextProps={WP_INPUT_LABEL_PROPS}
      helperText={helperText}
      id={id}
      InputLabelProps={WP_INPUT_LABEL_PROPS}
      inputMode="numeric"
      label={label}
      margin="dense"
      prefix="$"
      required={required}
      size="small"
      style={style}
      sx={WP_INPUT_SX}
      value={value === 0 ? "" : value}
      InputProps={{
        endAdornment: <InputAdornment position="end">$</InputAdornment>,
      }}
      inputProps={{
        maxLength: 13,
      }}
      onChange={(e) => {
        const val = e.target.value.replace(/[^0-9]/g, "");
        onChange(val);
      }}
    />
  );
}
