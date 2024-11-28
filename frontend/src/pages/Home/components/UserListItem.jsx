import { Link } from "react-router-dom";

export function UserListItem({ user }) {
  return (
    <Link
      className="list-group-item list-group-item-action"
      to={`/user/${user.id}`}
      style={{ textDecoration: "none" }}
    >
      <span className="ms-2">{user.username}</span>
    </Link>
  );
}
