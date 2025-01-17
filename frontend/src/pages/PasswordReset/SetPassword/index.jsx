import { CustomButton } from "@/shared/components/CustomButton";
import CustomCard from "@/shared/components/CustomCard";
import { Input } from "@/shared/components/Input";
import { Box, Grid2, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Alert } from "@/shared/components/Alert";
import { useSetPassword } from "./useSetPassword";

export function SetPassword() {
  const {
    apiProgress,
    errors,
    generalError,
    onChangePassword,
    onChangePasswordRepeat,
    onSubmit,
    success,
    disabled,
  } = useSetPassword();

  const { t } = useTranslation();

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
            {t("resetYourPassword")}
          </Typography>
          <Box
            component="form"
            onSubmit={onSubmit}
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
              id="password"
              label={t("password")}
              error={errors.password}
              onChange={onChangePassword}
              type="password"
            />
            <Input
              id="passwordRepeat"
              label={t("passwordRepeat")}
              error={errors.passwordRepeat}
              onChange={onChangePasswordRepeat}
              type="password"
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CustomButton type="submit" apiProgress={apiProgress}>
                {t("reset")}
              </CustomButton>
              {generalError && <Alert color="error">{generalError}</Alert>}
              {success && (
                <Alert color="success">{success}</Alert>
              )}
            </Box>
          </Box>
        </CustomCard>
      </Grid2>
    </Grid2>
  );
}
