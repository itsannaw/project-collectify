import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userStore from "../stores/userStore";

const AuthGuard = ({ component }) => {
  const { user, getUser } = userStore();

  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const checkToken = useCallback(async () => {
    let token = Cookies.get("token");
    if (!token) {
      navigate("/signin");
    }
    if (!user) {
      await getUser();
    }

    if (!user) {
      navigate("/signin");
    }
    setStatus(true);
  }, [navigate, getUser, user]);

  useEffect(() => {
    checkToken();
  }, [component, checkToken]);

  return status ? (
    <React.Fragment>{component}</React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default AuthGuard;
