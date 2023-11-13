export const WP_INPUT_LABEL_PROPS = {
  sx: {
    // Default color
    "&.Mui-focused": {
      color: "var(--hudzz-primary-color)", // Color when the TextField is focused
    },
    color: "var(--hudzz-secondary-input-color)",
  },
};

export const WP_INPUT_PROPS = {
  color: "var(--hudzz-input-text-color) !important",
};

export const WP_AND_INPUT_PROPS = {
  "& input": {
    color: "var(--hudzz-input-text-color) !important",
  },
};

export const WP_INPUT_SX = {
  "& .MuiOutlinedInput-root": {
    "& input": {
      color: "var(--hudzz-input-text-color) !important",
    },
    "&.Mui-focused": {
      "& + .MuiFormHelperText-root": {
        color: "var(--hudzz-primary-color)", // Focus color
      },
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--hudzz-primary-color)",
    },
  },
  backgroundColor: "var(--hudzz-background-color)",
};

export const WP_STEPPER_SX = {
  "& .MuiLinearProgress-bar": {
    backgroundColor: "var(--hudzz-primary-color)", // Custom color for the progress bar
  },
  "& .MuiLinearProgress-colorPrimary": {
    backgroundColor: "var(--hudzz-background-color)",
  },
  backgroundColor: "var(--hudzz-background-color)",
  color: "var(--hudzz-secondary-input-color)",
};

export const WP_SECONDARY_COLOR_AND_BACKGROUND_COLOR = {
  backgroundColor: "var(--hudzz-background-color)",
  color: "var(--hudzz-secondary-input-color)",
};
export const WP_PRIMARY_COLOR_AND_BACKGROUND_COLOR = {
  backgroundColor: "var(--hudzz-background-color)",
  color: "var(--hudzz-input-text-color) !important",
};

export const WP_RADIO_FORM_CONTROL_SX = {
  "& .MuiFormHelperText-root": {
    color: "var(--hudzz-secondary-input-color)",
    fontSize: "0.8em",
  },
  "& .MuiFormLabel-root": {
    color: "var(--hudzz-input-text-color)",
  },
};

export const WP_RADIO_SX = {
  "&.Mui-checked": {
    color: "var(--hudzz-primary-color)", // Color when the radio is checked
  },
};

export const WP_MENU_PROPS = {
  ".MuiMenuItem-root": {
    color: "var(--hudzz-input-text-color)",
  },
  ".MuiPaper-root": {
    backgroundColor: "var(--hudzz-background-color)",
  },
};
