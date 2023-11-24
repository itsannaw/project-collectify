import { useTranslation } from "react-i18next";
import FavouriteTag from "../components/Home/FavouriteTag";
import HomeCollection from "../components/Home/HomeCollection";
import ItemsCard from "../components/ItemsCard";
import { useCallback, useEffect, useState } from "react";
import api from "../api/http";

const HomePage = () => {
  const { t } = useTranslation();
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
    <div>
      <div className="flex flex-col justify-center items-center mt-10 gap-5">
        <FavouriteTag />
        <span className="font-bold text-xl">{t("home.large")}</span>
        <HomeCollection />
      </div>
      <div className="flex flex-col justify-center items-center gap-5 mt-10">
        <span className="font-bold text-xl">{t("home.last")}</span>
        <ItemsCard setOptions={setItems} options={items} />
      </div>
    </div>
  );
};

export default HomePage;
