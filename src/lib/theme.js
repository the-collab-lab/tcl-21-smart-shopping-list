import { createMuiTheme } from '@material-ui/core/styles';

const redCrayola = '#E84855';
const mellowApricot = '#FFBF69';
const lightCyan = '#CBF3F0';
const tiffanyBlue = '#2ec4b6';
const neonBlue = '#5465ff';
const prussianBlue = '#172a3a';

const theme = createMuiTheme({
  palette: {
    common: {
      red: `${redCrayola}`,
      yellow: `${mellowApricot}`,
      lightBlue: `${lightCyan}`,
      darkBlue: `${prussianBlue}`,
    },
    primary: {
      main: `${neonBlue}`,
    },
    secondary: {
      main: `${tiffanyBlue}`,
    },
  },
  typography: {
    fontFamily: 'Lato',
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 600,
    h1: {
      fontFamily: 'Mulish',
    },
    h2: {
      fontFamily: 'Mulish',
    },
    h3: {
      fontFamily: 'Mulish',
    },
    h4: {
      fontFamily: 'Mulish',
    },
    h5: {
      fontFamily: 'Mulish',
    },
    h6: {
      fontFamily: 'Mulish',
    },
  },
});

export default theme;
