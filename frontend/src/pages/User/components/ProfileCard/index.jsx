import { CustomButton } from "@/shared/components/CustomButton";
import { useAuthState } from "@/shared/state/context";
import { useState } from "react";
import ProfileImage from "@/shared/components/ProfileImage";
import { useSelector } from "react-redux";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CustomCard from "@/shared/components/CustomCard";
// import { UserEditForm } from "./UserEditForm";
// import { UserDeleteButton } from "./UserDeleteButton";

export function ProfileCard({ user }) {
  const authState = useSelector((store) => store.auth);
  const [editMode, setEditMode] = useState(false);
  const [tempImage, setTempImage] = useState();
  const { t } = useTranslation();

  const isLoggedInUser = !editMode && authState.id === user.id;

  //   const visibleUsername = authState.id === user.id ? authState.username : user.username;

  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      // style={{ minHeight: "100vh" }}
      sx={{ mt: 2 }}
    >
      <CustomCard>
        <Grid2
          container
          alignItems="center"
          justifyItems="center"
          spacing={2}
          direction="column"
        >
          {/* <div className="card-header text-center"> */}
          <ProfileImage tempImage={tempImage} image={user.image} />
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
      </CustomCard>
    </Grid2>
  );
}
