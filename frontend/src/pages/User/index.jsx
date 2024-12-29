import { getUser } from "./api";
import { Alert } from "@/shared/components/Alert";
import { Spinner } from "@/shared/components/Spinner";
import { useRouteParamApiRequest } from "@/shared/hooks/useRouteParamApiRequest";
import { ProfileCard } from "./components/ProfileCard";

export function User() {
  const {
    apiProgress,
    data: user,
    error,
  } = useRouteParamApiRequest("id", getUser);

  return (
    <>
      {apiProgress && (
        <Alert styleType="secondary" center>
          <Spinner />
        </Alert>
      )}
      {/* <h1>{user?.username}</h1> */}
      {user && <ProfileCard user={user} />}
      {error && <Alert styleType="danger">{error}</Alert>}
    </>
  );
}
