import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SortingBy = () => {
  const { t } = useTranslation();
  const [sort, setSort] = useState("10");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="sort-select">{t("home.sort")}</InputLabel>
        <Select
          labelId="sort"
          id="sort-select"
          value={sort}
          label={t("home.sort")}
          size="small"
          onChange={handleChange}
        >
          <MenuItem value={10}>{t("home.last")}</MenuItem>
          <MenuItem value={20}>{t("home.large")}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortingBy;
