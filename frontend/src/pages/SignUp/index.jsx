import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Link,
  Typography,
  CircularProgress,
} from "@mui/material";

import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

import Grid2 from "@mui/material/Grid2";
import linkedInLogo from "@/assets/LinkedIn.svg";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { signUp } from "./api";
// import { SimpleDialog } from "./components/SimpleDialog";
import { Input } from "./components/Input";
import { useTranslation } from "react-i18next";

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
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [apiProgress, setApiProgress] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        username: undefined,
      };
    });
  }, [username]);

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        email: undefined,
      };
    });
  }, [email]);

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        password: undefined,
      };
    });
  }, [password]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (passwordRepeatError == "") {
      setApiProgress(true);
      setGeneralError();
      try {
        const response = await signUp({
          username: username,
          email: email,
          password: password,
        });
        setSuccessMessage(response.data.message);
      } catch (axiosError) {
        if (axiosError.response?.data) {
          if (axiosError.response.data.status === 400) {
            setErrors(axiosError.response.data.validationErrors);
          } else {
            setGeneralError(axiosError.response.data.message);
          }
        } else {
          setGeneralError(t("genericError"));
        }
      } finally {
        setApiProgress(false);
      }
    }
  };

  let passwordRepeatError = useMemo(() => {
    if (password && password !== passwordRepeat) {
      return t("passwordMismatch");
    }
    return "";
  }, [password, passwordRepeat]);

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
            {t("signUp")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
          >
            <Input
              id="username"
              label={t("username")}
              error={errors.username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Input
              id="email"
              label={t("email")}
              error={errors.email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              id="password"
              label={t("password")}
              error={errors.password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
            <Input
              id="passwordRepeat"
              label={t("passwordRepeat")}
              error={passwordRepeatError}
              onChange={(event) => setPasswordRepeat(event.target.value)}
              type="password"
            />
            {/* <FormControlLabel
              required
              name="agree"
              id="agree"
              onChange={handleChange}
              control={
                <Checkbox checked={allSelected} onClick={handleClickOpen} />
              }
              label="Agree our terms"
            /> */}
            <Button
              type="submit"
              fullWidth
              disabled={apiProgress}
              variant="contained"
              // onClick={validateInputs}
              sx={{ mt: 1 }}
              // color="mainColor"
            >
              {apiProgress ? (
                <CircularProgress size={25} sx={{ mr: 2 }} />
              ) : (
                <>{t("signUp")}</>
              )}
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              {t("alreadyHaveAnAccount")}{" "}
              <span>
                <Link
                  component={ReactLink}
                  to="/Login"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  {t("login")}
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>{t("or")}</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
        {/* <SimpleDialog
          allSelected={allSelected}
          open={open}
          onClose={handleClose}
        /> */}
      </Grid2>
    </Grid2>
  );
}
