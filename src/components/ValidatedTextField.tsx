import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import {
  WP_AND_INPUT_PROPS,
  WP_INPUT_LABEL_PROPS,
  WP_INPUT_PROPS,
  WP_INPUT_SX,
} from "../themes/wordpressTheme";

export type ValidatedTextFieldProps = TextFieldProps & {
  helperText?: string;
  isValid: (isValid: boolean) => void;
  onChange: (val: string) => void;
  onError?: (data: { [key: string]: boolean }) => void;
  validate: (val: string) => boolean;
};

export default function ValidatedTextField({
  isValid,
  validate,
  helperText = " ",
  onChange,
  ...props
}: ValidatedTextFieldProps) {
  const [input, setInput] = useState({
    error: false,
    touched: false,
    valid: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    const touched = val !== "";
    const valid = validate(val);
    setInput({
      ...input,
      touched: touched,
      valid: valid,
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

  return (
    <TextField
      {...props}
      data-testid="validated-text-field"
      error={input.error}
      FormHelperTextProps={WP_INPUT_LABEL_PROPS}
      helperText={helperText}
      InputLabelProps={WP_INPUT_LABEL_PROPS}
      margin="dense"
      size="small"
      style={WP_INPUT_PROPS}
      sx={WP_INPUT_SX}
      InputProps={{
        sx: WP_AND_INPUT_PROPS,
      }}
      onBlur={handleBlur}
      onChange={handleInputChange}
      onFocus={onInputFocus}
    />
  );
}
