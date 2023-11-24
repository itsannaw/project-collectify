import { useCallback, useEffect, useState } from "react";

import ItemsCard from "../ItemsCard";
import api from "../../api/http";

const AllItems = () => {
  const [items, setItems] = useState([]);

  const getItems = useCallback(async () => {
    try {
      const { data } = await api.get("all_items");
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-10">
      <ItemsCard setOptions={setItems} options={items} />
    </div>
  );
};

export default AllItems;
