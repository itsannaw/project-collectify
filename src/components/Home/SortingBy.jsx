import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

const SortingBy = () => {
  const [sort, setSort] = useState("10");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="sort-select">Sort by...</InputLabel>
        <Select
          labelId="sort"
          id="sort-select"
          value={sort}
          label="Sort by..."
          size="small"
          onChange={handleChange}
        >
          <MenuItem value={10}>Last added items</MenuItem>
          <MenuItem value={20}>The 5 largest collections</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortingBy;
