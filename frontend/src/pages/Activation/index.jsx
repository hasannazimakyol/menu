import { activateUser } from "./api";
import { Spinner } from "@/shared/components/Spinner";
import { useRouteParamApiRequest } from "@/shared/hooks/useRouteParamApiRequest";
import { Alert, Grid2 } from "@mui/material";

export function Activation() {
  const { apiProgress, data, error } = useRouteParamApiRequest(
    "token",
    activateUser
  );
  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      sx={{ mt: 4 }}
    >
      {apiProgress && (
        <Alert styleType="secondary" center>
          <Spinner />
        </Alert>
      )}
      {data?.message && <Alert>{data.message}</Alert>}
      {error && <Alert color="error">{error}</Alert>}
    </Grid2>
  );
}
