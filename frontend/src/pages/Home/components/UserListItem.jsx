import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Avatar, ListItem, ListItemAvatar, Typography } from "@mui/material";
import ProfileImage from "@/shared/components/ProfileImage";

function UserListItem({ user }) {
  return (
    <>
      <ListItem
        sx={{
          my: 2,
        }}
      >
        <Link
          className="list-group-item list-group-item-action"
          to={`/user/${user.id}`}
          style={{ textDecoration: "none" }}
        >
          <ListItemAvatar
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ProfileImage width={30} image={user.image} />

            <Typography mx={2}>{user.username}</Typography>
          </ListItemAvatar>
        </Link>
      </ListItem>
    </>
  );
}

UserListItem.propTypes = {
  user: PropTypes.object,
};

export default UserListItem;
