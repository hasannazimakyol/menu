import { CustomButton } from "@/shared/components/CustomButton";
import { useTranslation } from "react-i18next";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useUserDeleteButton } from "./useUserDeleteButton";

export function UserDeleteButton() {
  const { t } = useTranslation();
  const { apiProgress, onClick } = useUserDeleteButton();
  return (
    <CustomButton
      apiProgress={apiProgress}
      onClick={onClick}
      color="error"
      variant="outlined"
      startIcon={<DeleteOutlinedIcon />}
    >
      {t("deleteUserButton")}
    </CustomButton>
  );
}
