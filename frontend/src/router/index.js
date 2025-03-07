import { createBrowserRouter } from "react-router-dom";

import { Home } from "@/pages/Home";
import { SignUp } from "@/pages/SignUp";
import App from "@/App";
//import { Activation } from "@/pages/Activation";
import { User } from "@/pages/User";
import { Login } from "@/pages/Login";
import { Activation } from "@/pages/Activation";
import { Profile } from "@/pages/Profile";
import { SetPassword } from "@/pages/PasswordReset/SetPassword";
import { PasswordResetRequest } from "@/pages/PasswordReset/Request";
import { AddIngredient } from "@/pages/AddIngredient";
// import { PasswordResetRequest } from "@/pages/PasswordReset/Request";
// import { SetPassword } from "@/pages/PasswordReset/SetPassword";

export default createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path: "/activation/:token",
        Component: Activation,
      },
      {
        path: "/user/:id",
        Component: User,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        // path: "/account/:id",
        path: "/account",
        Component: Profile,
      },
      {
        path: "/password-reset/request",
        Component: PasswordResetRequest,
      },
      {
        path: "/password-reset/set",
        Component: SetPassword,
      },
      {
        path: "/add-ingredient",
        Component: AddIngredient
      }
    ],
  },
]);
