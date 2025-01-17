import { Outlet } from "react-router-dom";
// import { LanguageSelector } from "./shared/components/LanguageSelector";
import { NavBar } from "./shared/components/NavBar";
// import { AuthenticationContext } from "./shared/state/context";
import { Provider } from "react-redux";
import { store } from "./shared/state/redux";
import { Container } from "@mui/material";

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
