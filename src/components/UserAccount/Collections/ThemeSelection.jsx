import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const currencies = [
  {
    value: "Books",
  },
  {
    value: "Foods",
  },
  {
    value: "Animals",
  },
  {
    value: "Games",
  },
];

export default function ThemeSelection() {
  return (
    <>
      <TextField
        id="theme"
        select
        defaultValue="Books"
        helperText="Please select your theme"
      >
        {currencies.map((option) => (
          <MenuItem key={option.value}>{option.value}</MenuItem>
        ))}
      </TextField>
    </>
  );
}
