import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Typography from "@mui/material/Typography";
import { unauthorizedApi } from "../api/http";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultErrors from "../components/SignUp/DefaultErrors";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [forms, setForms] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password_digest: "",
    password_confirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
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

      await unauthorizedApi.post("users", {
        ...forms,
      });
      setIsLoading(false);
      navigate("/signin");
    } catch (error) {
      if (error.response?.data.errors) {
        setErrors(error.response.data.errors);
      }

      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <section
      className="flex flex-col justify-center max-w-[500px]
    mx-auto my-[30px] border p-10 rounded-lg shadow-lg"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <Avatar>
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h5" variant="h5">
          {t("signup.up")}
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex mt-4 gap-4 ">
          <TextField
            autoComplete="given-name"
            name="first_name"
            required
            fullWidth
            id="first_name"
            label={t("signup.f_name")}
            autoFocus
            value={forms.first_name}
            onChange={handleChange}
            error={Boolean(errors.first_name)}
          />
          <TextField
            required
            fullWidth
            id="last_name"
            label={t("signup.l_name")}
            name="last_name"
            autoComplete="family-name"
            value={forms.last_name}
            onChange={handleChange}
            error={Boolean(errors.last_name)}
          />
        </div>
        <div className="flex flex-col mt-3 gap-3">
          <TextField
            required
            fullWidth
            id="username"
            label={t("signup.username")}
            name="username"
            value={forms.username}
            onChange={handleChange}
            error={Boolean(errors.username)}
          />
          <TextField
            required
            fullWidth
            id="email"
            label={t("signup.email")}
            name="email"
            autoComplete="email"
            value={forms.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
          />
          <TextField
            required
            fullWidth
            name="password"
            label={t("signup.passw")}
            type="password"
            id="password"
            autoComplete="new-password"
            value={forms.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
          />
          <TextField
            required
            fullWidth
            name="password_confirmation"
            label={t("signup.conf_passw")}
            type="password"
            id="confirm-password"
            value={forms.password_confirmation}
            onChange={handleChange}
            error={Boolean(errors.password_confirmation)}
          />
        </div>
        <div className="flex mt-2">
          <FormControlLabel
            control={
              <Checkbox
                value="allowExtraEmails"
                color="primary"
                onChange={() => setIsPrivacyChecked(!isPrivacyChecked)}
              />
            }
            label={t("signup.privacy_policy")}
          />
        </div>
        <div>
          <DefaultErrors errors={errors} />
        </div>
        <div className="flex flex-col justify-center items-center mt-2 gap-4">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            method="post"
            loading={isLoading}
            disabled={!isPrivacyChecked}
          >
            {t("btn.sign_up")}
          </Button>
          <Link className="text-[#1976d2] text-center underline" to="/signin">
            {t("signup.have_acc")}
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
