import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Typography from "@mui/material/Typography";
import { unauthorizedApi } from "../api/http";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const newErrors = { ...errors };
    delete newErrors[e.target.name];
    setErrors(newErrors);
    setForms({
      ...forms,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      await unauthorizedApi.post("signup", {
        user: {
          ...forms,
        },
      });
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      if (error.response?.data.status.errors) {
        setErrors(error.response.data.status.errors);
      }
      console.error(error);
      setIsLoading(false);
    }
  };
  return (
    <section className="flex flex-col justify-center max-w-[500px] mx-auto my-[30px] border p-10 rounded-lg shadow-lg">
      <div className="flex flex-col justify-center items-center gap-2">
        <Avatar>
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h5" variant="h5">
          Sign up
        </Typography>
      </div>
      <div className="flex mt-4 gap-4 ">
        <TextField
          autoComplete="given-name"
          name="firstName"
          required
          fullWidth
          id="firstName"
          label="First Name"
          autoFocus
        />
        <TextField
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
        />
      </div>
      <div className="flex flex-col mt-3 gap-3">
        <TextField
          required
          fullWidth
          id="email"
          label="Username"
          name="username"
        />
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
        />
        <TextField
          required
          fullWidth
          name="password"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          autoComplete="new-password"
        />
      </div>
      <div className="flex mt-2">
        <FormControlLabel
          control={<Checkbox value="allowExtraEmails" color="primary" />}
          label="I have read and agree to the Privacy Policy."
        />
      </div>
      <div className="flex flex-col justify-center items-center mt-2 gap-4">
        <Button type="submit" fullWidth variant="contained">
          Sign Up
        </Button>
        <Link href="#" variant="body2">
          Already have an account? Sign in!
        </Link>
      </div>
    </section>
  );
};

export default SignUp;
