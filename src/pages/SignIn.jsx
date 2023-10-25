import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import PeopleIcon from "@mui/icons-material/People";
import Typography from "@mui/material/Typography";

export default function SignIn() {
  return (
    <section className="flex flex-col justify-center max-w-[500px] mx-auto mt-[100px] border p-10 rounded-lg shadow-lg">
      <div className="flex flex-col justify-center items-center gap-2">
        <Avatar>
          <PeopleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </div>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
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
      />
      <div className="flex flex-col items-center gap-4 mt-4">
        <Button type="submit" fullWidth variant="contained">
          Sign In
        </Button>

        <Link href="#" variant="body2">
          Forgot password?
        </Link>
        <Link href="#" variant="body2">
          {"Don't have an account? Sign Up!"}
        </Link>
      </div>
    </section>
  );
}
