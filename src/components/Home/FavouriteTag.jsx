// src/components/FavouriteTag.jsx
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import api from "../../api/http";

const FavouriteTag = ({ filter, setFilter }) => {
  const { t } = useTranslation();
  const [tips, setTips] = useState([]);

  const getTags = async () => {
    try {
      const { data } = await api.get("tags");
      setTips(data.map((tag) => tag.title));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTags();
  }, []);


  return (
    <>
      <Autocomplete
        multiple
        limitTags={2}
        id="tags"
        size="small"
        options={tips}
        value={filter.tags}
        onChange={(_, tags) => setFilter({ ...filter, tags })}
        renderInput={(params) => (
          <TextField {...params} label={t("home.tags")} />
        )}
        sx={{ width: "300px" }}
      />
    </>
  );
};

export default FavouriteTag;
