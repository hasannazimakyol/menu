import { Input } from "@/shared/components/Input";
import { Info } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./api";
import { CustomButton } from "@/shared/components/CustomButton";
import { useRouteParamApiRequest } from "@/shared/hooks/useRouteParamApiRequest";
import { getUser } from "../User/api";
import { userUpdateSuccess } from "@/shared/state/redux";

export function Profile() {
  const [apiProgress, setApiProgress] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();

  const { t } = useTranslation();
  const authState = useSelector((store) => store.auth);
  const [username, setUsername] = useState(authState.username);
  const dispatch = useDispatch();

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
    setErrors({});
  };

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        username: undefined,
      };
    });
  }, [username]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setApiProgress(true);
    setErrors({});
    setGeneralError();
    try {
      const response = await updateUser(authState.id, { username });
      dispatch(userUpdateSuccess(response.data));
    } catch (axiosError) {
      if (axiosError.response?.data) {
        if (axiosError.response.data.status === 400) {
          setErrors(axiosError.response.data.validationErrors);
        } else {
          setGeneralError(axiosError.response.data.message);
        }
      } else {
        setGeneralError(t("genericError"));
      }
    } finally {
      setApiProgress(false);
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "medium" }}>
            {t("myProfile")}
          </Typography>
          <Tooltip title="Your personal information">
            <IconButton size="small" sx={{ ml: 1 }}>
              <Info size={20} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box component="form" onSubmit={onSubmit}>
          <Input
            id="username"
            label={t("username")}
            error={errors.username}
            defaultValue={authState.username}
            onChange={onChangeUsername}
          />

          {/* <TextField
            fullWidth
            label="Mobile number"
            value={formData.mobileNumber}
            onChange={(e) =>
              setFormData({ ...formData, mobileNumber: e.target.value })
            }
            margin="normal"
            variant="outlined"
          />

          <DatePicker
            label="Birthday"
            value={formData.birthday}
            onChange={(newValue) =>
              setFormData({ ...formData, birthday: newValue })
            }
            sx={{ mt: 2, mb: 1, width: "100%" }}
          /> */}

          {/* <Button
            variant="contained"
            type="submit"
            sx={{
              mt: 3,
              bgcolor: "#9e9e9e",
              "&:hover": {
                bgcolor: "#757575",
              },
              textTransform: "none",
              px: 4,
            }}
          >
            {t("save")}
          </Button> */}
          {generalError && (
            <Alert sx={{ mt: 2 }} severity="error">
              {generalError}
            </Alert>
          )}
          <CustomButton
            type="submit"
            apiProgress={apiProgress}
            fullWidth={false}
          >
            {t("save")}
          </CustomButton>
        </Box>
      </Paper>
    </Container>
  );
}
