import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PeopleIcon from "@mui/icons-material/People";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { unauthorizedApi } from "../api/http";
import userStore from "../stores/userStore";
import { useTranslation } from "react-i18next";

export default function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getUserIfToken } = userStore();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorText, setErrorText] = useState("");

  const handleChange = (e) => {
    setErrorText("");
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await unauthorizedApi.post("auth/login", {
        ...credentials,
      });
      const { token } = data;
      Cookies.set("token", token);
      await getUserIfToken();

      navigate("/");
    } catch (error) {
      if (error.response?.data.error) {
        setErrorText(error.response.data.error);
      }
      console.error(error);
    }
  };

  return (
    <div
      className="flex flex-col justify-center max-w-[500px] mx-auto
     mt-[80px] border p-10 rounded-lg shadow-lg"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <Avatar>
          <PeopleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("signin.in")}
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={t("signin.email")}
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          value={credentials.email}
          onChange={handleChange}
          error={Boolean(errorText)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label={t("signin.passw")}
          type="password"
          id="password"
          autoComplete="current-password"
          value={credentials.password}
          onChange={handleChange}
          error={Boolean(errorText)}
        />
        <div className="text-red-500 text-[15px] font-semibold">
          {errorText}
        </div>
        <div className="flex flex-col items-center gap-4 mt-4">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
          >
            {t("signin.in")}
          </Button>

          <Link className="text-[#1976d2] text-center underline">
            {t("signin.forg_passw")}
          </Link>
          <Link className="text-[#1976d2] text-center underline" to="/signup">
            {t("signin.reg_here")}
          </Link>
        </div>
      </form>
    </div>
  );
}
