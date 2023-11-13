import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";

import { WP_INPUT_LABEL_PROPS, WP_INPUT_PROPS, WP_INPUT_SX } from "../themes/wordpressTheme";

export type EmailTextFieldProps = TextFieldProps & {
  helperText?: string;
  isValid: (isValid: boolean) => void;
  onChange: (val: string) => void;
};

export default function EmailTextField({
  isValid,
  onChange,
  helperText = " ",
  ...props
}: EmailTextFieldProps) {
  const [input, setInput] = useState({
    error: false,
    touched: false,
    valid: false,
  });

  const onEmailTextFieldChange = (val: string) => {
    const touched = val !== "";
    const valid = RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}").test(val);
    setInput({
      ...input,
      touched: touched,
      valid: valid,
    });
    isValid(valid);
  };

  const onEmailTextFieldFocus = () => {
    setInput({ ...input, error: false });
  };

  const onEmailTextFieldBlur = () => {
    setInput({
      ...input,
      error: !input.valid && input.touched,
    });
  };

  return (
    <TextField
      {...props}
      fullWidth
      required
      autoComplete="email"
      data-testid="email-text-field"
      error={input.error}
      FormHelperTextProps={WP_INPUT_LABEL_PROPS}
      helperText={input.error ? "Please enter a valid email." : helperText}
      InputLabelProps={WP_INPUT_LABEL_PROPS}
      margin="dense"
      size="small"
      sx={WP_INPUT_SX}
      inputProps={{
        sx: WP_INPUT_PROPS,
      }}
      onBlur={onEmailTextFieldBlur}
      onFocus={onEmailTextFieldFocus}
      onChange={(e) => {
        onEmailTextFieldChange(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
}
