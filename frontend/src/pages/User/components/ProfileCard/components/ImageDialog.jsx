import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ImageDialog({
  open,
  onClose,
  onAction,
  image,
  imageWidth = 200,
  error,
}) {
  const { t } = useTranslation();

  const handleAction = (action) => {
    if (onAction) {
      onAction(action);
    } else {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      //   closeAfterTransition={false}
      PaperProps={{
        sx: {
          backgroundColor: "#F4F4F4",
          //   boxShadow: "none",
          backdropFilter: "blur(10px)",
        },
      }}
    >
      {/* <DialogTitle>
        {t("imageDialogTitle")}
      </DialogTitle> */}
      <DialogContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 8,
        }}
      >
        <Avatar
          alt={t("myProfile")}
          src={image}
          sx={{
            width: imageWidth,
            height: imageWidth,
          }}
        />
        {error && (
          <Alert sx={{ mt: 5 }} color="error">
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-evenly", mb: 4 }}>
        <Button variant="outlined" onClick={() => handleAction(true)}>
          {t("save")}
        </Button>
        <Button variant="outlined" onClick={() => handleAction(false)}>
          {t("cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
