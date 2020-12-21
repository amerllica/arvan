import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    arvanGrey: '#818a91',
    arvanTableHeader: '#dddddd',
    background: {
      darkGrey: '#373a3c',
      default: '#fff',
    },
    error: {
      contrastText: '#d9534f',
      dark: '#efdfdf',
      main: '#c15046',
    },
    formBackground: '#eceeef',
    formHeader: '#777777',
    primary: {
      main: '#1c7cd5',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

export default theme;
