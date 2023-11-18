import { useCallback, useEffect, useState } from "react";
import api from "../../../api/http";
import MediaCard from "../MediaCard";
import CreateCollectionButtons from "./CreateCollectionButtons";
import userStore from "../../../stores/userStore";

const CollectionTable = () => {
  const [collections, setCollections] = useState([]);
  const { user } = userStore();

  const getCollections = useCallback(async () => {
    try {
      const { data } = await api.get("collections", {
        params: {
          user_id: user.id,
        },
      });
      setCollections(data);
    } catch (error) {
      console.error;
    }
  }, [user.id]);

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  return (
    <section>
      <div className="flex justify-center items-center gap-3">
        <CreateCollectionButtons />
      </div>
      <div className="flex max-w-[1000px] justify-between flex-wrap mt-6 gap-6">
        <MediaCard options={collections} />
      </div>
    </section>
  );
};

export default CollectionTable;
