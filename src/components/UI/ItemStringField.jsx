import { TextField } from "@mui/material";

const ItemStringField = ({ value, setValue, label }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <TextField
      label={label}
      value={value || ""}
      size="small"
      onChange={handleChange}
      inputProps={{ maxLength: 50 }}
    />
  );
};

export default ItemStringField;
