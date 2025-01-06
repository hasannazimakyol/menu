import { useRef, useState } from "react";
import ProfileImage from "@/shared/components/ProfileImage";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid2, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CustomCard from "@/shared/components/CustomCard";
import ImageDialog from "./components/ImageDialog";
import { userUpdateSuccess } from "@/shared/state/redux";
import { updateUser } from "@/pages/Profile/api";
// import { UserEditForm } from "./UserEditForm";
// import { UserDeleteButton } from "./UserDeleteButton";

export function ProfileCard({ user }) {
  const authState = useSelector((store) => store.auth);
  const [editMode, setEditMode] = useState(false);
  const [apiProgress, setApiProgress] = useState();
  const [generalError, setGeneralError] = useState();
  const [errors, setErrors] = useState({});
  const [tempImage, setTempImage] = useState();
  const { t } = useTranslation();
  const [newImage, setNewImage] = useState();
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const isLoggedInUser = !editMode && authState.id === user.id;

  //   const visibleUsername = authState.id === user.id ? authState.username : user.username;

  const onSelectImage = (event) => {
    if (event.target.files.length < 1) return;
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      const data = fileReader.result;
      setNewImage(data);
      setImageDialogOpen(true);
    };

    fileReader.readAsDataURL(file);
  };

  const handleCloseImageDialog = () => {
    setImageDialogOpen(false);
    setNewImage();
    setErrors({});
    fileInputRef.current.value = "";
  };
  const handleImageDialogAction = async (action) => {
    setErrors({});
    if (action) {
      setApiProgress(true);
      setErrors({});
      setGeneralError();
      try {
        const response = await updateUser(authState.id, {
          username: authState.username,
          image: newImage,
        });
        setImageDialogOpen(false);
        setNewImage();
        dispatch(userUpdateSuccess(response.data));
      } catch (axiosError) {
        // setImageDialogOpen(true);
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
    } else {
      handleCloseImageDialog();
    }
  };
  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      // style={{ minHeight: "100vh" }}
      sx={{ mt: 4 }}
    >
      {/* <CustomCard> */}
      <Grid2
        container
        alignItems="center"
        justifyItems="center"
        spacing={2}
        direction="column"
      >
        {/* <div className="card-header text-center"> */}
        <div>
          <label htmlFor="upload-avatar">
            <ProfileImage
              // tempImage={newImage}
              image={isLoggedInUser ? authState.image : user.image}
              editMode={isLoggedInUser}
            />
          </label>
          {isLoggedInUser && (
            <input
              id="upload-avatar"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onSelectImage}
              ref={fileInputRef}
              // onClick={onSelectImage}
            />
          )}
        </div>
        <Typography>{user.username}</Typography>
        {isLoggedInUser && (
          <Button
            variant="text"
            size="large"
            component={Link}
            to="/account"
            // to={`/account/${authState.id}`}
          >
            {t("edit")}
          </Button>
        )}
        {imageDialogOpen && (
          <ImageDialog
            open={imageDialogOpen}
            onClose={handleCloseImageDialog}
            onAction={handleImageDialogAction}
            image={newImage}
            error={errors.image}
          />
        )}
        {/* </div> */}
        {/* <div className="card-body text-center">
        {!editMode && <span className="fs-3 d-block">{visibleUsername}</span>}
        {isLoggedInUser && (
          <>
            <Button onClick={() => setEditMode(true)}>Edit</Button>
            <div className="d-inline m-1"></div>
            <UserDeleteButton />
          </>
        )}
        {editMode && <UserEditForm setEditMode={setEditMode} setTempImage={setTempImage}/>}
      </div> */}
      </Grid2>
      {/* </CustomCard> */}
    </Grid2>
  );
}
