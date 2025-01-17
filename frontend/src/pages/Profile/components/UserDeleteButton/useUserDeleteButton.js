import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "./api";
import { useCallback, useState } from "react";
import { logoutSuccess } from "@/shared/state/redux";
import { useNavigate } from "react-router-dom";

export function useUserDeleteButton() {
  const [apiProgress, setApiProgress] = useState(false);
  const { id } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = useCallback(async () => {
    setApiProgress(true);
    try {
      await deleteUser(id);
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
    } finally {
      setApiProgress(false);
    }
  }, [id]);

  return { apiProgress, onClick };
}
