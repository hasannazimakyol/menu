import { CustomButton } from "@/shared/components/CustomButton";
import CustomCard from "@/shared/components/CustomCard";
import { Input } from "@/shared/components/Input";
import { Alert, Box, Grid2, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { usePasswordResetRequest } from "./usePasswordResetRequest";

export function PasswordResetRequest() {
  const { onSubmit, onChangeEmail, apiProgress, success, error, generalError } =
    usePasswordResetRequest();

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
              id="email"
              label={t("email")}
              error={error}
              onChange={onChangeEmail}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                mt: 2,
              }}
            >
              {generalError && <Alert color="error">{generalError}</Alert>}
              {success && <Alert color="success">{success}</Alert>}
              <CustomButton type="submit" apiProgress={apiProgress}>
                {t("reset")}
              </CustomButton>
            </Box>
          </Box>
        </CustomCard>
      </Grid2>
    </Grid2>
  );
}
