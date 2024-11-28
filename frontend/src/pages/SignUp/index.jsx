// import { useEffect, useMemo, useState } from "react";
// import { signUp } from "./api";
// import { Input } from "@/shared/components/Input";
// import { useTranslation } from "react-i18next";
// import { Alert } from "@/shared/components/Alert";
// import { Spinner } from "@/shared/components/Spinner";
// import { Button } from "@/shared/components/Button";

// export function SignUp() {
//   const [username, setUsername] = useState();
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [passwordRepeat, setPasswordRepeat] = useState();
//   const [apiProgress, setApiProgress] = useState();
//   const [successMessage, setSuccessMessage] = useState();
//   const [errors, setErrors] = useState({});
//   const [generalError, setGeneralError] = useState();
//   const { t } = useTranslation();

//   useEffect(() => {
//     setErrors(function (lastErrors) {
//       return {
//         ...lastErrors,
//         username: undefined,
//       };
//     });
//   }, [username]);

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
//     setSuccessMessage();
//     setGeneralError();
//     setApiProgress(true);

//     try {
//       const response = await signUp({
//         username,
//         email,
//         password,
//       });
//       setSuccessMessage(response.data.message);
//     } catch (axiosError) {
//       if (axiosError.response?.data) {
//         if (axiosError.response.data.status === 400) {
//           setErrors(axiosError.response.data.validationErrors);
//         } else {
//           setGeneralError(axiosError.response.data.message);
//         }
//       } else {
//         setGeneralError(t("genericError"));
//       }
//     } finally {
//       setApiProgress(false);
//     }
//   };

//   const passwordRepeatError = useMemo(() => {
//     if (password && password !== passwordRepeat) {
//       return t("passwordMismatch");
//     }
//     return "";
//   }, [password, passwordRepeat]);

//   return (
//     <div className="container">
//       <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
//         <form className="card" onSubmit={onSubmit}>
//           <div className="text-center card-header">
//             <h1>{t("signUp")}</h1>
//           </div>
//           <div className="card-body">
//             <Input
//               id="username"
//               label={t("username")}
//               error={errors.username}
//               onChange={(event) => setUsername(event.target.value)}
//             />
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
//             <Input
//               id="passwordRepeat"
//               label={t("passwordRepeat")}
//               error={passwordRepeatError}
//               onChange={(event) => setPasswordRepeat(event.target.value)}
//               type="password"
//             />
//             {successMessage && <Alert>{successMessage}</Alert>}
//             {generalError && <Alert styleType="danger">{generalError}</Alert>}
//             <div className="text-center">
//               <Button
//                 disabled={!password || password !== passwordRepeat}
//                 apiProgress={apiProgress}
//               >
//                 {t("signUp")}
//               </Button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogTitle, Box, Button, Checkbox, Divider, FormControlLabel, FormLabel, FormControl, Link, TextField, Typography } 
from "@mui/material";

import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

import Grid2 from "@mui/material/Grid2";
import linkedInLogo from "@/assets/LinkedIn.svg";
import { useNavigate, Link as ReactLink } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
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

export function SignUp() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const [open, setOpen] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setAllSelected(value);
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const name = document.getElementById("name");

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

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if(!allSelected){
      isValid = false;
    }

    return isValid;
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
    console.log(inputs);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nameError && !emailError && !passwordError && allSelected) {
      console.log(inputs);
      navigate("/success");
    }
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   name: data.get("name"),
    //   lastName: data.get("lastName"),
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
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
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              textAlign: "center",
            }}
          >
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
          >
            <FormControl>
              {/* <FormLabel htmlFor="name">Full name</FormLabel> */}
              <TextField
                label="Full Name"
                autoComplete="name"
                name="name"
                // required
                fullWidth
                id="name"
                // placeholder="Hasan Nazım Akyol"
                error={nameError}
                helperText={nameErrorMessage}
                color={+nameError ? "error" : "primary"}
                value={inputs.name || ""}
                onChange={(event) => {
                  setNameError(false);
                  setNameErrorMessage("");
                  handleChange(event);
                }}
              />
            </FormControl>
            <FormControl>
              {/* <FormLabel htmlFor="email">Email</FormLabel> */}
              <TextField
                label="Email"
                // required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={+passwordError ? "error" : "primary"}
                value={inputs.email || ""}
                onChange={(event) => {
                  setEmailError(false);
                  setEmailErrorMessage("");
                  handleChange(event);
                }}
              />
            </FormControl>
            <FormControl>
              {/* <FormLabel htmlFor="password">Password</FormLabel> */}
              <TextField
                label="Password"
                // required
                fullWidth
                name="password"
                // placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
                value={inputs.password || ""}
                onChange={(event) => {
                  setPasswordError(false);
                  setPasswordErrorMessage("");
                  handleChange(event);
                }}
              />
            </FormControl>
            {/* <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            /> */}

            {/* <Button variant="outlined" onClick={handleClickOpen}>
              Open simple dialog
            </Button> */}
            <FormControlLabel
              required
              name="agree"
              id="agree"
              onChange={handleChange}
              control={
                <Checkbox checked={allSelected} onClick={handleClickOpen} />
              }
              label="Agree our terms"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              sx={{ mt: 1 }}
              // color="mainColor"
            >
              Sign up
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <span>
                <Link
                  component={ReactLink}
                  to="/Login"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Log in
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
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
        <SimpleDialog
          allSelected={allSelected}
          open={open}
          onClose={handleClose}
        />
      </Grid2>
    </Grid2>
  );
}

function SimpleDialog(props) {
  const { onClose, allSelected, open } = props;

  const [term, setTerm] = useState(false);
  const [term2, setTerm2] = useState(false);
  const [term3, setTerm3] = useState(false);

  const handleClose = () => {
    if (term && term2 && term3) {
      onClose(true);
    } else {
      onClose(false);
    }
  };

  useEffect(() => {
    setTerm(allSelected);
    setTerm2(allSelected);
    setTerm3(allSelected);
  }, [open]);

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle textAlign="center">Agree our terms</DialogTitle>
      <TextField
        sx={{
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
          },
        }}
        value={`There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injectedhumour, or non-characteristic words etc`}
        disabled
        multiline
        rows={10}
        variant="outlined"
        fullWidth
      ></TextField>
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            required
            control={
              <Checkbox
                checked={term}
                onChange={(event) => setTerm(event.target.checked)}
              />
            }
            label="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
          />
          <FormControlLabel
            required
            control={
              <Checkbox
                checked={term2}
                onChange={(event) => setTerm2(event.target.checked)}
              />
            }
            label="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
          />
          <FormControlLabel
            required
            control={
              <Checkbox
                checked={term3}
                onChange={(event) => setTerm3(event.target.checked)}
              />
            }
            label="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
          />
        </Box>
      </Box>
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleClose}
            disabled={!term || !term2 || !term3}
            sx={{ borderRadius: 10, height: 30, mx: 1 }}
          >
            OK
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="anger"
            onClick={() => onClose(false)}
            sx={{ borderRadius: 10, height: 30, mx: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  allSelected: PropTypes.bool.isRequired,
};
