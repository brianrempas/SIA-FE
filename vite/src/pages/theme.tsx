import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(98, 0, 192, 1)',
      dark: 'rgba(72, 0, 141, 1)',
      light: 'rgba(124, 0, 243, 1)',
      lightFade: 'rgba(124, 0, 243, 0.10)',
    },
    secondary: {
      main: '#FF4081',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },

});

export default theme;
