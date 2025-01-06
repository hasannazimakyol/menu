import { useCallback, useEffect, useRef, useState } from "react";
import { loadUsers } from "./api";
import { Spinner } from "@/shared/components/Spinner";
import UserListItem from "./UserListItem";
import { Grid2, List, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export function UserList() {
  // const [userPage, setUserPage] = useState({
  //   content: [],
  //   last: false,
  //   first: false,
  //   number: 0,
  // });
  const [userPage, setUserPage] = useState([]);
  const [apiProgress, setApiProgress] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const authState = useSelector((store) => store.auth);
  const { t } = useTranslation();

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
        if (page != null) {
          setUserPage((prevItems) => [...prevItems, ...response.data.content]);
        } else {
          setUserPage(() => [...response.data.content]);
        }
      } catch {
        setHasMore(false);
      } finally {
        setApiProgress(false);
      }
    },
    [page]
  );
  useEffect(() => {
    getUsers();
    return () => {
      console.log("component is unmount empty");
    };
    // if (authState) getUsers(page);
  }, [authState]);

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
  }, [apiProgress]);

  return (
    <Grid2
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        {t("userList")}
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
