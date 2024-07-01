
export const WP_INPUT_LABEL_PROPS = {
  sx: {
    // Default color
    "&.Mui-focused": {
      color: "var(--hudzz-closing-disclosure-generator-primary-color)", // Color when the TextField is focused
    },
    color: "var(--hudzz-closing-disclosure-generator-secondary-input-color)",
  },
};

export const WP_INPUT_PROPS = {
  color: "var(--hudzz-closing-disclosure-generator-input-text-color) !important",
};

export const WP_AND_INPUT_PROPS = {
  "& input": {
    color: "var(--hudzz-closing-disclosure-generator-input-text-color) !important",
  },
};

export const WP_INPUT_SX = {
  "& .MuiOutlinedInput-root": {
    "& input": {
      color: "var(--hudzz-closing-disclosure-generator-input-text-color) !important",
    },
    "&.Mui-focused": {
      "& + .MuiFormHelperText-root": {
        color: "var(--hudzz-closing-disclosure-generator-primary-color)", // Focus color
      },
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--hudzz-closing-disclosure-generator-primary-color)",
    },
  },
  backgroundColor: "var(--hudzz-closing-disclosure-generator-background-color)",
};

export const WP_STEPPER_SX = {
  "& .MuiLinearProgress-bar": {
    backgroundColor: "var(--hudzz-closing-disclosure-generator-primary-color)", // Custom color for the progress bar
  },
  "& .MuiLinearProgress-colorPrimary": {
    backgroundColor: "var(--hudzz-closing-disclosure-generator-background-color)",
  },
  backgroundColor: "var(--hudzz-closing-disclosure-generator-background-color)",
  color: "var(--hudzz-closing-disclosure-generator-secondary-input-color)",
};

export const WP_SECONDARY_COLOR_AND_BACKGROUND_COLOR = {
  backgroundColor: "var(--hudzz-closing-disclosure-generator-background-color)",
  color: "var(--hudzz-closing-disclosure-generator-secondary-input-color)",
};

export const WP_PRIMARY_COLOR_AND_BACKGROUND_COLOR = {
  backgroundColor: "var(--hudzz-closing-disclosure-generator-primary-color)",
  color: "var(--hudzz-closing-disclosure-generator-input-text-color) !important",
  "&:hover": {
    backgroundColor: "var(--hudzz-closing-disclosure-generator-primary-color)",
  },
};

export const WP_RADIO_FORM_CONTROL_SX = {
  "& .MuiFormHelperText-root": {
    color: "var(--hudzz-closing-disclosure-generator-secondary-input-color)",
    fontSize: "0.8em",
  },
  "& .MuiFormLabel-root": {
    color: "var(--hudzz-closing-disclosure-generator-input-text-color)",
  },
};

export const WP_RADIO_SX = {
  color: "var(--hudzz-closing-disclosure-generator-input-text-color)",
  "&.Mui-checked": {
    color: "var(--hudzz-closing-disclosure-generator-primary-color)", // Color when the radio is checked
  },
};

export const WP_MENU_PROPS = {
  ".MuiMenuItem-root": {
    color: "var(--hudzz-closing-disclosure-generator-input-text-color)",
  },
  ".MuiPaper-root": {
    backgroundColor: "var(--hudzz-closing-disclosure-generator-background-color)",
  },
};
