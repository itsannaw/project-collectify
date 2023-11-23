import { TextField } from "@mui/material";

const ItemIntField = ({ value, setValue, label }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <TextField
      label={label}
      value={value || ""}
      size="small"
      type="number"
      onChange={handleChange}
    />
  );
};

export default ItemIntField;
