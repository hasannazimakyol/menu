// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Alert } from "@/shared/components/Alert";
// import { Input } from "@/shared/components/Input";
// import { Button } from "@/shared/components/Button";
// import { login } from "./api";
// import { useAuthDispatch } from "@/shared/state/context";
// import { Link, useNavigate } from "react-router-dom";

// export function Login() {
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [apiProgress, setApiProgress] = useState();
//   const [errors, setErrors] = useState({});
//   const [generalError, setGeneralError] = useState();
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const dispatch = useAuthDispatch();

//   useEffect(() => {
//     setErrors(function (lastErrors) {
//       return {
//         ...lastErrors,
//         email: undefined,
//       };
//     });
//   }, [email]);

//   useEffect(() => {
//     setErrors(function (lastErrors) {
//       return {
//         ...lastErrors,
//         password: undefined,
//       };
//     });
//   }, [password]);

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     setGeneralError();
//     setApiProgress(true);

//     try {
//         const response = await login({ email, password })
//         dispatch({type: 'login-success', data: response.data})
//         navigate("/")
//     } catch (axiosError) {
//         if (axiosError.response?.data) {
//           if (axiosError.response.data.status === 400) {
//             setErrors(axiosError.response.data.validationErrors);
//           } else {
//             setGeneralError(axiosError.response.data.message);
//           }
//         } else {
//           setGeneralError(t("genericError"));
//         }
//     } finally {
//         setApiProgress(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
//         <form className="card" onSubmit={onSubmit}>
//           <div className="text-center card-header">
//             <h1>{t("login")}</h1>
//           </div>
//           <div className="card-body">
//             <Input
//               id="email"
//               label={t("email")}
//               error={errors.email}
//               onChange={(event) => setEmail(event.target.value)}
//             />
//             <Input
//               id="password"
//               label={t("password")}
//               error={errors.password}
//               onChange={(event) => setPassword(event.target.value)}
//               type="password"
//             />
//             {generalError && <Alert styleType="danger">{generalError}</Alert>}
//             <div className="text-center">
//               <Button disabled={!email || !password} apiProgress={apiProgress}>
//                 {t("login")}
//               </Button>
//             </div>
//           </div>
//           <div className="card-footer text-center">
//             <Link to="/password-reset/request">Forget password?</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import Grid2 from "@mui/material/Grid2";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import linkedInLogo from "@/assets/LinkedIn.svg";

// import ForgotPassword from './ForgotPassword';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export function Login() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailError && !passwordError) {
      navigate("/success");
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
      sx={{ mt: 2 }}
    >
      <Grid2 xs={3}>
        <Card
          variant="outlined"
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            border: "none",
          }}
        >
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <SitemarkIcon />
          </Box> */}
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              textAlign: "center",
            }}
          >
            Log In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
              mt: 2,
            }}
          >
            <FormControl>
              {/* <FormLabel htmlFor="email">Email</FormLabel> */}
              <TextField
                label="Email"
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                // placeholder="your@email.com"
                autoComplete="email"
                // autoFocus
                // required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
                sx={{ ariaLabel: "email" }}
              />
            </FormControl>
            <FormControl>
              {/* <FormLabel htmlFor="password">Password</FormLabel> */}
              <TextField
                label="Password"
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                // placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                // autoFocus
                // required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                {/* <FormLabel htmlFor="password">Password</FormLabel> */}
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: "baseline" }}
                >
                  Forgot your password?
                </Link>
              </Box>
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              color="mainColor"
            >
              Log in
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <span>
                <Link
                  component={ReactLink}
                  to="/signup"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
              // startIcon={<GoogleIcon />}
            >
              Log In with Google
            </Button> */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with LinkedIn")}
              startIcon={<img src={linkedInLogo} width={20} />}
            >
              Log In with LinkedIn
            </Button>
          </Box>
        </Card>
      </Grid2>
    </Grid2>
  );
}
