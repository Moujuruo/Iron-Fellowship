import { PropsWithChildren, createContext, useState } from "react";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import { dark } from "@mui/material/styles/createPalette";
import useMediaQuery from '@mui/material/useMediaQuery';



export const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export function ThemeProvider(props: PropsWithChildren) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { children } = props;
  const [theme, setTheme] = useState(prefersDarkMode ? darkTheme : lightTheme);
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
