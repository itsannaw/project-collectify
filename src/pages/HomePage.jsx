import FavoriteTag from "../components/Home/FavouriteTag";
import SortingBy from "../components/Home/SortingBy";

const HomePage = () => {
  return (
    <div className="flex justify-center items-center mt-10 gap-5">
      <span className="text-l">Add to your collection</span>
      <SortingBy />
      <FavoriteTag />
      <span></span>
    </div>
  );
};

export default HomePage;
