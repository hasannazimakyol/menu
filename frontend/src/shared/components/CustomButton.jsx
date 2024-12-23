import { CircularProgress, Button } from "@mui/material";

export function CustomButton({
  apiProgress,
  disabled,
  children,
  onClick,
  // styleType = "primary",
  type,
}) {
  return (
    <Button
      type={type}
      fullWidth
      disabled={apiProgress}
      variant="contained"
      onClick={onClick}
      sx={{ mt: 1 }}
      // color="mainColor"
    >
      {/* {apiProgress && <CircularProgress size={25} sx={{ mr: 2 }} />}
      {children} */}
      {apiProgress ? (
        <CircularProgress size={25} sx={{ mr: 2 }} />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
