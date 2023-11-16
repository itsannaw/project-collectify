import { useEffect, useState } from "react";
import api from "../../../api/http";
import MediaCard from "../MediaCard";
import CreateCollectionButtons from "./CreateCollectionButtons";

const CollectionTable = () => {
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const { data } = await api.get("collection");
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
      <div className="flex justify-center items-center gap-3">
        <CreateCollectionButtons />
      </div>
      <div className="flex max-w-[1000px] mt-6 gap-6">
        <MediaCard options={collections} />
      </div>
    </section>
  );
};

export default CollectionTable;
