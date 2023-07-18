import { TypeBackground, colors, createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    fontFamilyTitle: string,
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    fontFamilyTitle: string,
  }
  interface Palette {
    icon: Palette["primary"];
    border: Palette["primary"];
  }
  interface PaletteOptions {
    icon: PaletteOptions["primary"];
    border: PaletteOptions["primary"];
  }

  interface TypeBackground {
    background: TypeBackground["default"];
  }
}

export const lightTheme = createTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#3f3f46", // 3f3f46
      dark: "#27272a",
      contrastText: "#000000"
    },
    secondary: {
      main: "#ff6584",
    },
    success: {
      light: "#10b981",
      main: "#059669",
      dark: "#047857",
    },
    error: {
      light: "#ef4444",
      main: "#dc2626",
      dark: "#b91c1c",
    },
    background: {
      paper: "#fff",         // content background
      default: "#f4f4f5",
      background: "#e4e4e7", // under background
    },
    icon: {
      main: "#757575"
    },
    border: {
      main: "#c4c4c4"
    },
    grey: {
      [50]: "#5b5b5c",      // character details color
      [100]: "#f4f4f5",     // add asset side color
      [200]: "#e4e4e7",
      [300]: "#d4d4d8",
      [400]: "#a1a1aa",
      [500]: "#71717a",
      [600]: "#52525b",
      [700]: "#3f3f46",
      [800]: "#27272a",
      [900]: "#18181b",  // character details color
      A100: "#f4f4f5",
      A200: "#e4e4e7",
      A400: "#a1a1aa",
      A700: "#3f3f46",
    },
  },
  typography: {
    fontFamily: [
      "RubikVariable",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  fontFamilyTitle: [
    "Staatliches",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  shape: {
    borderRadius: 2,
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      light: "#27272a",
      dark: "#52525b",
      main: "#3f3f46", // 3f3f46
      contrastText: "#d8d4cf"
    },
    secondary: {
      main: "#ff6584",
    },
    success: {
      light: "#10b981",
      main: "#059669",
      dark: "#047857",
    },
    error: {
      light: "#ef4444",
      main: "#dc2626",
      dark: "#b91c1c",
    },
    background: {
      paper: "#181a1b", // content background
      default: "#f4f4f5",
      background: "#262a2b", // under background
    },
    icon: {
      main: "#898887"
    },
    border: {
      main: "#323230"
    },
    grey: {
      [50]: "#9a9b99",
      [100]: "#1e2022",
      [200]: "#e4e4e7",
      [300]: "#d4d4d8",
      [400]: "#a1a1aa",
      [500]: "#71717a",
      [600]: "#b1aba1",
      [700]: "#3f3f46",
      [800]: "#27272a",
      [900]: "#cdcbc9",
      A100: "#1e2022",
      A200: "#e4e4e7",
      A400: "#a1a1aa",
      A700: "#3f3f46",
    },
  },
  typography: {
    fontFamily: [
      "RubikVariable",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  fontFamilyTitle: [
    "Staatliches",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  shape: {
    borderRadius: 2,
  },
});
