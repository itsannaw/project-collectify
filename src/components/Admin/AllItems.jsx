import { useCallback, useEffect, useState } from "react";

import ItemsCard from "../ItemsCard";
import api from "../../api/http";
import { Pagination, Stack } from "@mui/material";

const AllItems = () => {
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
    <div className="flex flex-col justify-center items-center gap-5 mt-10">
      <ItemsCard setOptions={setItems} options={items} />
      <Stack spacing={2} mt={3} mb={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
};

export default AllItems;
