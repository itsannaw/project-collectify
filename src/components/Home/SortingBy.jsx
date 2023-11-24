import { useCallback, useEffect, useState } from "react";
import MediaCard from "../MediaCard";
import api from "../../api/http";
import { Spinner } from "../UI/Spinner";

const SortingBy = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCollections = async () => {
    try {
      const { data } = await api.get("all_collections");
      setCollections(data);
    } catch (error) {
      console.error;
    }
  };
  const onMounted = useCallback(async () => {
    setLoading(true);
    await getCollections();
    setLoading(false);
  }, []);
  useEffect(() => {
    onMounted();
  }, [onMounted]);

  if (!collections || loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-wrap justify-start w-full max-w-[1200px] gap-10 mx-auto">
      {collections?.map((collection) => (
        <div key={collection.id} className="max-w-[calc(33.33%-2.5rem)] w-full">
          <MediaCard option={collection} />
        </div>
      ))}
    </div>
  );
};

export default SortingBy;
