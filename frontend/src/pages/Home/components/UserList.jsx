import { useCallback, useEffect, useRef, useState } from "react";
import { loadUsers } from "./api";
import { Spinner } from "@/shared/components/Spinner";
import UserListItem from "./UserListItem";
import { Grid2, List, Typography } from "@mui/material";

export function UserList() {
  // const [userPage, setUserPage] = useState({
  //   content: [],
  //   last: false,
  //   first: false,
  //   number: 0,
  // });
  const [userPage, setUserPage] = useState([]);
  const [apiProgress, setApiProgress] = useState(false);
  const [page, setPage] = useState(-1);
  const [hasMore, setHasMore] = useState(true);

  const loader = useRef(null);

  const getUsers = useCallback(
    async (page) => {
      if (!hasMore) return;
      setApiProgress(true);
      try {
        const response = await loadUsers(page);
        // setUserPage(response.data);
        setHasMore(!response.data.last);
        setPage(response.data.number);
        setUserPage((prevItems) => [...prevItems, ...response.data.content]);
      } finally {
        // catch { }
        setApiProgress(false);
      }
    },
    [page, hasMore]
  );

  useEffect(() => {
    return () => {
      console.log("component is unmount empty");
    };
    // getUsers();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !apiProgress) {
          getUsers(page + 1);
        }
      },
      { threshold: 1.0 }
    );
    const target = loader.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      console.log("component is unmount");
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [apiProgress, hasMore]);

  return (
    <Grid2
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        User List
      </Typography>
      <List>
        {userPage.map((user) => {
          return <UserListItem key={user.id} user={user} />;
        })}
      </List>
      {apiProgress && <Spinner />}
      <div ref={loader} style={{ height: "20px" }} />
    </Grid2>
  );
}
