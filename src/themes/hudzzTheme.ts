//https://bareynol.github.io/mui-theme-creator/
// import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { createTheme } from "@mui/material/styles";
const themeOptions = {
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        input: {
          height: "42px !important",
          paddingBottom: "0px !important",
          paddingLeft: "16px !important",
          paddingTop: "0px !important",
        },
        inputRoot: {
          height: "44px !important",
          padding: "0px !important",
        },
      },
    },
  },
};
export const theme = createTheme(themeOptions);
