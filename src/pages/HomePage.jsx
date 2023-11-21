import FavoriteTag from "../components/Home/FavouriteTag";
import SortingBy from "../components/Home/SortingBy";
import MediaCard from "../components/UserAccount/MediaCard";

const HomePage = () => {
  return (
    <div>
      <div className="flex justify-center items-center mt-10 gap-5">
        <span className="text-l">Add to your collection</span>
        <SortingBy />
        <FavoriteTag />
        <span></span>
      </div>
      <div className="flex justify-center items-center gap-5 mt-10">
        <MediaCard />
      </div>
    </div>
  );
};

export default HomePage;
