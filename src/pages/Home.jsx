import FavoriteTag from "../components/Home/FavouriteTag";
import SortingBy from "../components/Home/SortingBy";
import NavBar from "../components/NavBar/NavBar";

const Home = () => {
  return (
    <section>
      <div>
        <NavBar />
      </div>
      <div className="flex justify-center items-center mt-10 gap-5">
        <span className="text-l">Add to your collection</span>
        <SortingBy />
        <FavoriteTag />
        <span></span>
      </div>
      <div className="flex max-w-[350px] mx-auto mt-5 justify-center"></div>
    </section>
  );
};

export default Home;
