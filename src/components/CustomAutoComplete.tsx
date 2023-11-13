import { Autocomplete, Paper, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { Option } from "../constants/DataModelConstants";
import {
  WP_INPUT_LABEL_PROPS,
  WP_INPUT_PROPS,
  WP_INPUT_SX,
  WP_PRIMARY_COLOR_AND_BACKGROUND_COLOR,
} from "../themes/wordpressTheme";

export type CustomAutoCompleteProps = TextFieldProps & {
  id: string;
  isValid?: (valid: boolean) => void;
  onValueChange: (value: string | null | Option<string>) => void;
  options: (string | Option<string>)[];
  value: string | null;
};

export default function CustomAutoComplete({
  id,
  options,
  value,
  onValueChange,
  disabled,
  isValid = () => {},
  required = false,
  ...props
}: CustomAutoCompleteProps) {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <Autocomplete
        data-testid="custom-auto-complete"
        disabled={disabled}
        getOptionLabel={(option) => (typeof option === "string" ? option : option.label)}
        id={id}
        inputValue={inputValue}
        options={options}
        PaperComponent={(props) => <Paper {...props} sx={WP_PRIMARY_COLOR_AND_BACKGROUND_COLOR} />}
        size="small"
        sx={WP_INPUT_SX}
        value={value}
        componentsProps={{
          popper: {
            modifiers: [
              {
                enabled: false,
                name: "flip",
              },
              {
                enabled: false,
                name: "preventOverflow",
              },
            ],
          },
        }}
        isOptionEqualToValue={(option, value) => {
          if (typeof option === "string") {
            return option === value;
          } else {
            return option.label === value;
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            {...props}
            FormHelperTextProps={WP_INPUT_LABEL_PROPS}
            helperText={props.helperText || " "}
            InputLabelProps={WP_INPUT_LABEL_PROPS}
            margin="dense"
            required={required}
            size="small"
            sx={WP_INPUT_SX}
            inputProps={{
              ...params.inputProps,
              ...WP_INPUT_PROPS,
            }}
          />
        )}
        onChange={(_e, data) => {
          if (required) isValid(data !== null);
          onValueChange(data);
        }}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
      />
    </>
  );
}
