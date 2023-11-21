import { Checkbox, FormControlLabel } from "@mui/material";

const ItemBoolField = ({ value, setValue, label }) => {
  const handleChange = (e) => {
    setValue(e.target.checked);
  };

  return (
    <div className="flex items-center">
      <span className="font-bold">{label}</span>
      <FormControlLabel
        control={<Checkbox />}
        onChange={handleChange}
        value={value}
        labelPlacement="start"
      />
    </div>
  );
};

export default ItemBoolField;
