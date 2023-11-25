import { useTranslation } from "react-i18next";
import FavouriteTag from "../components/Home/FavouriteTag";
import HomeCollection from "../components/Home/HomeCollection";
import ItemsCard from "../components/ItemsCard";
import { useCallback, useEffect, useState } from "react";
import api from "../api/http";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const HomePage = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getItems = useCallback(async (pageNumber) => {
    try {
      const { data } = await api.get("all_items", {
        params: {
          page: pageNumber,
        },
      });
      setItems(data.items);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getItems(page);
    };

    fetchData();
  }, [getItems, page]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10 gap-5">
        <FavouriteTag />
        <span className="font-bold text-xl">{t("home.large")}</span>
        <HomeCollection />
      </div>
      <div className="flex flex-col justify-center items-center gap-5 mt-10">
        <span className="font-bold text-xl">{t("home.last")}</span>
        <ItemsCard setOptions={setItems} options={items} />
        <Stack spacing={2} mt={3}>
          <Pagination
            count={totalPages}
            page={page}
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
