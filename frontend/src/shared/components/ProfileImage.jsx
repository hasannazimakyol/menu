import defaultProfileImage from "@/assets/profile.png";
import PropTypes from "prop-types";

function ProfileImage({ width, tempImage, image }) {
  const profileImage = image ? `/assets/profile/${image}` : defaultProfileImage;

  return (
    <img
      src={tempImage || profileImage}
      width={width}
      height={width}
      className="rounded-circle shadow-sm"
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
};

export default ProfileImage;
