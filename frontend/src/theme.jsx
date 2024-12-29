import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto-condensed";
import "@fontsource/faustina";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  components: {
    MuiTextField: {
      variants: [ // variants will help you define the props given by Mui and the styles you want to apply for it
        {
          props: { variant: 'outlined', disabled: true }, 
          style: {
            color: 'black',
            fontSize: '10rem'
          }
        }
      ]
    }
  },
  typography: {
    // fontFamily: ['"Montserrat"', "Open Sans"].join(","),
    fontFamily: ["Faustina", "Open Sans"].join(","),
  },
  palette: {
    primary: createColor("#3b8082"),
    anger: createColor("#F40B27"),
    apple: createColor("#5DBA40"),
    steelBlue: createColor("#5C76B7"),
    violet: createColor("#BC00A3"),
    carolineBlue: createColor("#7BAFD4"),
    // mainColor: createColor("#4b8dbd"),
    mainColor: createColor("#3b8082"),
    background: {
      default: "#F4F4F4",
    },
  }
});

export default theme;
