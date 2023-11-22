import FavouriteTag from "../components/Home/FavouriteTag";
import SortingBy from "../components/Home/SortingBy";
import MediaCards from "../components/UserAccount/MediaCards";

const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10 gap-5">
        <FavouriteTag />
        <span className="font-bold text-xl">Latest collections added...</span>
        <SortingBy />
      </div>
      <div className="flex justify-center items-center gap-5 mt-10">
        <MediaCards />
      </div>
    </div>
  );
};

export default HomePage;
