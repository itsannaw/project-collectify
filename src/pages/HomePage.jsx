import { useTranslation } from "react-i18next";
import FavouriteTag from "../components/Home/FavouriteTag";
import SortingBy from "../components/Home/SortingBy";
import MediaCard from "../components/UserAccount/MediaCard";

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-center items-center mt-10 gap-5">
        <span className="text-l">{t("collection.add")}</span>
        <SortingBy />
        <FavouriteTag />
      </div>
      <div className="flex justify-center items-center gap-5 mt-10">
        <MediaCard />
      </div>
    </div>
  );
};

export default HomePage;
