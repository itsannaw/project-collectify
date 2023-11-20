import { useCallback, useEffect, useState } from "react";
import api from "../api/http";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useNavigate, useParams } from "react-router-dom";
import { getDateTime } from "../helpers/date-utils";
import { Button, Checkbox, Rating } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const MoreCollection = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  const { id } = useParams();

  const getCollections = useCallback(async () => {
    try {
      const { data } = await api.get(`collection/${id}`);
      setCollections(data);
    } catch (error) {
      console.error;
    }
  }, [id]);

  const deleteCollection = async () => {
    try {
      await api.delete(`collection/${id}`);
      navigate("/");
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  return (
    <div className="flex flex-col items-center relative max-w-[1400px]  mx-auto border rounded-xl shadow-lg m-10 p-5">
      <div className="flex absolute right-5">
        <Button
          color="warning"
          onClick={() => navigate(`/edit-collection/${id}`)}
        >
          Edit
        </Button>
        <Button color="error" onClick={deleteCollection}>
          Delete
        </Button>
      </div>

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
      <div className="flex flex-col items-center gap-5 mt-10">
        <Button onClick={() => navigate(`/collection/${id}/create-item`)}>
          Add item
        </Button>
      </div>
    </div>
  );
};

export default MoreCollection;
