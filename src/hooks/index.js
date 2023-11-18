import { useEffect } from "react";
import userStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";

export const useRedirectIfNotAdmin = () => {
  const navigate = useNavigate();
  const { user } = userStore();

  useEffect(() => {
    if (!user.admin) {
      navigate("/");
    }
  }, [user, navigate]);
};
