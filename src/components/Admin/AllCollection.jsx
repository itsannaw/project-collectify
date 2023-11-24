import { useEffect, useState } from "react";
import MediaCards from "../UserAccount/MediaCards";
import api from "../../api/http";

const AllCollection = () => {
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const { data } = await api.get("all_collections");
      setCollections(data);
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <div className="flex max-w-[1000px] justify-center flex-wrap mt-6 gap-6">
      <MediaCards options={collections} />
    </div>
  );
};

export default AllCollection;
