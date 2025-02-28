import ReactDOM from "react-dom/client";
import "./styles.scss";
import "./locales";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  // </StrictMode>
);
