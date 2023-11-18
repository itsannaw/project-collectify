import { useCallback, useEffect, useState } from "react";
import api from "../api/http";
import MediaCard from "../components/UserAccount/MediaCard";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useParams } from "react-router-dom";
import { getDateTime } from "../helpers/date-utils";
import { Checkbox, Rating } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

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
    <div className="flex max-w-[1400px]  mx-auto justify-center border rounded-xl shadow-lg m-10 p-5">
      <div className="flex flex-col items-center gap-5 max-w-[800px] w-full border rounded-xl p-5">
        <div className="flex relative justify-center w-full items-start">
          <div className="absolute left-0">
            <Rating
              name="simple-controlled"
              // value={value}
              // onChange={(event, newValue) => {
              //   setValue(newValue);
              // }}
            />
          </div>

          <img
            className="w-[300px] h-[300px]"
            src={collections?.image_url}
            alt="#"
          />
          <div className="absolute right-0">
            <Checkbox
              // {...label}
              icon={<BookmarkBorderIcon />}
              checkedIcon={<BookmarkIcon />}
              color="error"
            />
          </div>
        </div>
        <span className="text-xl font-bold">{collections?.title}</span>
        <MarkdownPreview source={collections?.desc} />
        <div className="flex flex-col gap-3 justify-start w-full">
          <span>
            <b>Theme:</b> {collections?.category?.title}
          </span>
          <span className="flex gap-2 items-center">
            <b>Creator:</b>{" "}
            <img
              className="h-[25px] w-[25px]"
              src={collections.user?.avatar}
              alt="avatar"
            />
            {collections.user?.first_name} {collections.user?.last_name} (@
            {collections.user?.username})
          </span>
          <span>
            <b>Created:</b> {getDateTime(collections?.created_at)}
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5 mt-10">
        <MediaCard />
      </div>
    </div>
  );
};

export default MoreCollection;
