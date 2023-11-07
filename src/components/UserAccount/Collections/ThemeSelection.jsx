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

const ThemeSelection = () => {
  return (
    <>
      <TextField
        id="theme"
        select
        defaultValue="Books"
        helperText="Please select your theme"
        required
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default ThemeSelection;
