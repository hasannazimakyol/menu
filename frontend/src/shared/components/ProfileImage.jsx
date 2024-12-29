import defaultProfileImage from "@/assets/profile.png";
import { Avatar } from "@mui/material";
import { t } from "i18next";
import PropTypes from "prop-types";

function ProfileImage({ width, tempImage, image }) {
  const profileImage = image ? `/assets/profile/${image}` : defaultProfileImage;

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
      src={tempImage || profileImage}
      sx={{
        width: width,
        height: width,
      }}
    />
  );
}

ProfileImage.propTypes = {
  width: PropTypes.number,
  tempImage: PropTypes.string,
  image: PropTypes.string,
};

export default ProfileImage;
