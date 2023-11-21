import { useEffect, useState } from "react";
import MediaCard from "../UserAccount/MediaCard";
import api from "../../api/http";

const AllCollection = () => {
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const { data } = await api.get("collections");
      setCollections(data);
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <section>
      <div className="flex max-w-[1000px] justify-between flex-wrap mt-6 gap-6">
        <MediaCard options={collections} />
      </div>
    </section>
  );
};

export default AllCollection;
