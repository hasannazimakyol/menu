import { CircularProgress, Button } from "@mui/material";

export function CustomButton({
  apiProgress,
  disabled,
  children,
  onClick,
  // styleType = "primary",
  type,
  fullWidth,
  variant = "contained",
  color = "mainColor",
  startIcon
}) {
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      disabled={apiProgress}
      variant={variant}
      onClick={onClick}
      sx={{ mt: 2 }}
      color={color}
      startIcon={startIcon}
    >
      {/* {apiProgress && <CircularProgress size={25} sx={{ mr: 2 }} />}
      {children} */}
      {apiProgress ? (
        <CircularProgress size={25} />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
