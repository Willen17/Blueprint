import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#EFEFEF',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: ['Inter'].join(','),
    h1: {
      fontSize: 13,
      fontWeight: 600,
    },
    h2: {
      fontSize: 12,
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: 11,
      fontWeight: 600,
    },
    body1: {
      fontFamily: 'Inter',
      fontSize: 11,
    },
    body2: {
      fontFamily: 'Inter',
      fontSize: 10,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: 20,
          background: '#EFEFEF',
          boxShadow: 'none',
          fontSize: 11,
          fontWeight: 400,
          minWidth: 'fit-content',
          padding: '12px 10px',
          textTransform: 'unset',
          '&:hover': {
            background: '#000',
            color: '#fff',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 25,
          height: 14,
          padding: 0,
          display: 'flex',
          '&:active': {
            '& .MuiSwitch-thumb': {
              width: 10,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
              transform: 'translateX(9px)',
            },
          },
          '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
              transform: 'translateX(12px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#EFEFEF',
              },
            },
          },
          '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 10,
            height: 10,
            borderRadius: 6,
          },
          '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: '#000',
            boxSizing: 'border-box',
          },
        },
      },
    },
  },
});
