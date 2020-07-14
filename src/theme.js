import { createMuiTheme } from '@material-ui/core';

const themeBase = createMuiTheme({
  typography: {
    fontFamily: ['Helvetica Neue', 'Arial', 'sans-serif'].join(',')
  },
  spacing: 0,
  palette: {
    secondary: {
      light: '#5f5fc4',
      main: '#283593',
      dark: '#001064',
      contrastText: '#fff'
    },
    error: {
      light: '#d56363',
      main: '#e57373',
      dark: '#f44336'
    }
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: 'rgba(0, 0, 0, 1)'
      },
      colorSecondary: {
        backgroundColor: 'rgba(0, 0, 0, 1)'
      }
    },
    MuiButton: {
      root: {
        margin: '5px',
        padding: '5px'
      },
      containedPrimary: {
        backgroundColor: 'rgba(40, 40, 40, 1)',
        '&:hover': {
          backgroundColor: 'rgba(120, 120, 120, 1)'
        }
      },
      textPrimary: {
        color: 'rgba(40, 40, 40, 1)'
      }
    },
    MuiPaper: {
      root: {
        margin: '5px',
        padding: '5px',
        backgroundColor: 'rgba(255, 255, 255, 1)'
      }
    },
    MuiCard: {
      root: {
        height: '100%',
        margin: '5px',
        backgroundColor: 'rgba(255, 255, 255, 1)'
      }
    },
    MuiRadio: {
      root: {
        position: 'relative',
        left: '1.75em',
        top: '-3.4em'
      }
    },
    MuiCardHeader: {
      root: {
        backgroundColor: '#eee'
      }
    },
    MuiFormGroup: {
      root: {
        marginTop: '1em'
      }
    },
    MuiAccordionDetails: {
      root: {
        display: 'block',
        padding: 0
      }
    }
  }
});

export const lightTheme = {
  ...themeBase
};

export default lightTheme;
