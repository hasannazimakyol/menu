import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { t } from "i18next";

export default function AlertDialog({ open, onClose, onAction }) {
  const handleAction = (action) => {
    if (onAction) onAction(action);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      closeAfterTransition={false}
    >
      <DialogTitle id="alert-dialog-title">
        {t("logoutDialogTitle")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t("logoutDialogText")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleAction(true)}>{t("yes")}</Button>
        <Button onClick={() => handleAction(false)}>{t("no")}</Button>
      </DialogActions>
    </Dialog>
  );
}
