import FavoriteTag from "../components/Home/FavouriteTag";
import NavBar from "../components/NavBar/NavBar";

const Home = () => {
  return (
    <section>
      <div>
        <NavBar />
      </div>
      <div className="flex justify-center mt-10">
        <span className="text-xl">Add to your collection</span>
        <span></span>
      </div>
      <div className="flex max-w-[350px] mx-auto mt-5 justify-center">
        <FavoriteTag />
      </div>
    </section>
  );
};

export default Home;
