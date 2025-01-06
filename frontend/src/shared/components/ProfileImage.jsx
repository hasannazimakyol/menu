import defaultProfileImage from "@/assets/profile.png";
import { Avatar } from "@mui/material";
import { t } from "i18next";
import PropTypes from "prop-types";

{
  /* <div className="card-header text-center"> */
}
function ProfileImage({ width, tempImage, image, editMode }) {
  const profileImage = image ? `/assets/profile/${image}` : defaultProfileImage;
  const cursor = editMode ? "pointer" : "";

  return (
    // <img
    //   src={tempImage || profileImage}
    //   width={width}
    //   height={width}
    //   className="rounded-circle shadow-sm"
    //   onError={({ target }) => {
    //     target.src = defaultProfileImage;
    //   }}
    // />
    <Avatar
      alt={t("myProfile")}
      // src={image || defaultProfileImage}
      src={profileImage}
      sx={{
        width: width,
        height: width,
        cursor: cursor,
      }}
      onError={({ target }) => {
        target.src = defaultProfileImage;
      }}
    />
  );
}

ProfileImage.propTypes = {
  width: PropTypes.number,
  tempImage: PropTypes.string,
  image: PropTypes.string,
  editMode: PropTypes.bool,
};

export default ProfileImage;
