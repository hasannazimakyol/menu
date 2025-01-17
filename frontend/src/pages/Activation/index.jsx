import { activateUser } from "./api";
import { Spinner } from "@/shared/components/Spinner";
import { useRouteParamApiRequest } from "@/shared/hooks/useRouteParamApiRequest";
import { Alert } from "@mui/material";

export function Activation() {
  const { apiProgress, data, error } = useRouteParamApiRequest(
    "token",
    activateUser
  );
  return (
    <>
      {apiProgress && (
        <Alert styleType="secondary" center>
          <Spinner />
        </Alert>
      )}
      {data?.message && <Alert>{data.message}</Alert>}
      {error && <Alert color="error">{error}</Alert>}
    </>
  );
}
