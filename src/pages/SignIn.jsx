import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PeopleIcon from "@mui/icons-material/People";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { unauthorizedApi } from "../api/http";

export default function SignIn() {
  const navigate = useNavigate();
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
      navigate("/");
    } catch (error) {
      if (error.response?.data.error) {
        setErrorText(error.response.data.error);
      }
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center max-w-[500px] mx-auto mt-[80px] border p-10 rounded-lg shadow-lg">
      <div className="flex flex-col justify-center items-center gap-2">
        <Avatar>
          <PeopleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
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
          label="Password"
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
            Sign In
          </Button>

          <Link className="text-[#1976d2] text-center underline">
            Forgot password?
          </Link>
          <Link className="text-[#1976d2] text-center underline" to="/signup">
            Don`t have an account? Register here.
          </Link>
        </div>
      </form>
    </div>
  );
}
