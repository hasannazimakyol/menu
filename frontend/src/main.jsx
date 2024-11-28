import ReactDOM from "react-dom/client";
import "./styles.scss";
import "./locales";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
