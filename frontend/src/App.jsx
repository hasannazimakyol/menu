import { Outlet } from "react-router-dom";
// import { LanguageSelector } from "./shared/components/LanguageSelector";
import { NavBar } from "./shared/components/NavBar";
// import { AuthenticationContext } from "./shared/state/context";
import { Provider, useDispatch } from "react-redux";
import { loginSuccess, store } from "./shared/state/redux";
import { Container } from "@mui/material";
import { useEffect } from "react";
import http from "./lib/http";
import { logout } from "./shared/components/NavBar/api";

function App() {

  return (
    // <AuthenticationContext>
    <Provider store={store}>
      <NavBar />
      {/* <div className="container mt-3"> */}
      <Container my={3}>
        <Outlet />
        {/* <LanguageSelector /> */}
      </Container>
      {/* </div> */}
    </Provider>
    // </AuthenticationContext>
  );
}

export default App;
