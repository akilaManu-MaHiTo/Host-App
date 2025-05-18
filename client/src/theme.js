import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Ysabeau Infant, sans-serif",
    fontWeight: 400,
    fontSize: 20, // base font size

    h1: {
      fontSize: "20px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "20px",
      fontWeight: 500,
    },
    h3: {
      fontSize: "20px",
      fontWeight: 500,
    },
    h4: {
      fontSize: "20px",
      fontWeight: 500,
    },
    h5: {
      fontSize: "20px",
      fontWeight: 500,
    },
    h6: {
      fontSize: "18px",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "20px",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "20px",
      fontWeight: 400,
    },
    body1: {
      fontSize: "20px",
      fontWeight: 400,
    },
    body2: {
      fontSize: "15px",
      fontWeight: 400,
    },
    button: {
      fontSize: "18px",
      fontWeight: 500,
      textTransform: "none",
    },
    caption: {
      fontSize: "15px",
      fontWeight: 300,
    },
    overline: {
      fontSize: "20px",
      fontWeight: 300,
      textTransform: "uppercase",
    },
  },
  palette: {
    background: {
      default: '#f0f2e3',
    },
  },
});

export default theme;
