import { Checkbox } from "@mui/material";

const ItemBoolField = ({ value, setValue, label }) => {
  const handleChange = (e) => {
    setValue(e.target.checked);
  };

  return (
    <div className="flex items-center">
      <span className="font-bold">{label}</span>
      <Checkbox
        onChange={handleChange}
        value={value}
        checked={value || false}
      />
    </div>
  );
};

export default ItemBoolField;
