import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Grid2 from "@mui/material/Grid2";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import linkedInLogo from "@/assets/LinkedIn.svg";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomButton } from "@/shared/components/CustomButton";
import { Input } from "@/shared/components/Input";
import CustomCard from "@/shared/components/CustomCard";
import { login } from "./api";
// import { useAuthDispatch } from "@/shared/state/context";
import { loginSuccess } from "@/shared/state/redux";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";

// import ForgotPassword from './ForgotPassword';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';

export function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const [apiProgress, setApiProgress] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // const dispatch = useAuthDispatch();
  const dispatch = useDispatch();

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

  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);  // Checkbox seçili ise true, değilse false
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setSuccessMessage();
    setGeneralError();
    setApiProgress(true);
    try {
      const response = await login({
        email,
        password,
        rememberMe
      });
      // dispatch({ type: "login-success", data: response.data.user });
      dispatch(loginSuccess(response.data));
      navigate("/");
      // setSuccessMessage(response.data.message);
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
  };

  const handleClickForgotPassword = () => {
    navigate("/password-reset/request");
  };

  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      // style={{ minHeight: "100vh" }}
      sx={{ mt: 2 }}
    >
      <Grid2 xs={3}>
        <CustomCard
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
            {t("login")}
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
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              {/* <FormLabel htmlFor="password">Password</FormLabel> */}
              <Link
                component="button"
                type="button"
                onClick={handleClickForgotPassword}
                variant="body2"
                sx={{ alignSelf: "baseline" }}
              >
                {t("forgotYourPassword")}
              </Link>
            </Box>
            <FormControlLabel
              control={<Checkbox
                value="remember"
                color="primary"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />}
              label={t("rememberMe")}
            />
            {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
            <CustomButton type="submit" apiProgress={apiProgress}>
              {t("login")}
            </CustomButton>
            {generalError && <Alert color="error">{generalError}</Alert>}
            <Typography sx={{ textAlign: "center" }}>
              {t("dontHaveAnAccount")}{" "}
              <span>
                <Link
                  component={ReactLink}
                  to="/signup"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  {t("signUp")}
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>{t("or")}</Divider>
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
              {t("loginWithLinkedin")}
            </Button>
          </Box>
        </CustomCard>
      </Grid2>
    </Grid2>
  );
}
