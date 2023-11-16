import { useCallback, useEffect, useState } from "react";
import api from "../api/http";
import MediaCard from "../components/UserAccount/MediaCard";
import { useParams } from "react-router-dom";
import { getDateTime } from "../helpers/date-utils";

const MoreCollection = () => {
  const [collections, setCollections] = useState([]);

  let { id } = useParams();

  const getCollections = useCallback(async () => {
    try {
      const { data } = await api.get(`collection/${id}`);
      setCollections(data);
    } catch (error) {
      console.error;
    }
  }, [id]);

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  return (
    <div className="flex max-w-[1400px]  mx-auto justify-center border rounded-xl mt-10 p-5">
      <div className="flex flex-col items-center gap-5 max-w-[800px] w-full border rounded-xl p-5">
        <img
          className="w-[300px] h-[300px]"
          src={collections.image_url}
          alt="#"
        />
        <span className="text-l">{collections.title}</span>
        <span>{collections.desc}</span>
        <span>Theme: {collections.category?.title}</span>
        <span>Creator: </span>
        <span>Created: {getDateTime(collections.created_at)}</span>
      </div>
      <div className="flex justify-center items-center gap-5 mt-10">
        <MediaCard />
      </div>
    </div>
  );
};

export default MoreCollection;
