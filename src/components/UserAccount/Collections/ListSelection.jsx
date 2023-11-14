import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const ListSelection = ({ value, setValue, options }) => {
  return (
    <>
      <TextField id="theme" select value={value} required>
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
            onClick={() => setValue(option.id)}
          >
            {option.title}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default ListSelection;
