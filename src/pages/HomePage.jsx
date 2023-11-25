import { useTranslation } from "react-i18next";
import FavouriteTag from "../components/Home/FavouriteTag";
import HomeCollection from "../components/Home/HomeCollection";
import ItemsCard from "../components/ItemsCard";
import { useCallback, useEffect, useState } from "react";
import api from "../api/http";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { LoadingButton } from "@mui/lab";

const DEFAULT_FILTER = {
  page: 1,
  tags: [],
};

const HomePage = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [totalPages, setTotalPages] = useState(1);

  const getItems = useCallback(async () => {
    try {
      const { data } = await api.get("all_items", {
        params: {
          page: filter.page,
          tags: filter.tags,
        },
      });
      setItems(data.items);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  }, [filter.page, filter.tags]);

  const handlePageChange = (event, page) => {
    setFilter({
      ...filter,
      page,
    });
  };

  const fetchData = useCallback(async () => {
    await getItems(filter.page);
  }, [filter.page, getItems]);

  useEffect(() => {
    fetchData();
  }, [fetchData, filter.page, getItems]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10 gap-5">
        <FavouriteTag filter={filter} setFilter={setFilter} />
        <LoadingButton variant="contained" onClick={fetchData}>
          {t("btn.search")}
        </LoadingButton>
        <span className="font-bold text-xl">{t("home.large")}</span>
        <HomeCollection />
      </div>
      <div className="flex flex-col justify-center items-center gap-5 mt-10">
        <span className="font-bold text-xl">{t("home.last")}</span>
        <ItemsCard setOptions={setItems} options={items} />
        <Stack spacing={2} mt={3} mb={3}>
          <Pagination
            count={totalPages}
            page={filter.page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
};

export default HomePage;
