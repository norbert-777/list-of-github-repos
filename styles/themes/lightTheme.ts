import { createTheme } from '@mui/material/styles';
import { Roboto } from '@next/font/google';

// Use Google font required by mui
// @link https://mui.com/material-ui/getting-started/installation/#roboto-font
export const ROBOTO_FONT = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const LIGHT_THEME = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: ROBOTO_FONT.style.fontFamily,
  },
});
