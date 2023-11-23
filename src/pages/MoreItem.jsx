import { Checkbox, IconButton, Link } from "@mui/material";
import { FIELDS_COUNTERS, OPTIONAL_FIELDS_NAMES } from "../const/collections";
import { getFieldName, getInfoByCollection } from "../helpers/collections";
import { getDateTime } from "../helpers/date-utils";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Spinner } from "../components/UI/Spinner";
import { useCheckUser } from "../hooks/useCheckUser";
import { AlertButton } from "../components/UI/AlertButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import api from "../api/http";

const MoreItem = () => {
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  const { id, itemId } = useParams();
  const navigate = useNavigate();
  const { checkUser } = useCheckUser();

  const toggleLike = async ({ id, is_liked }) => {
    setLoading(true);
    try {
      if (is_liked) {
        await api.get(`dislike/${id}`);
      } else {
        await api.get(`like/${id}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
    const items = [...item];
    const item = items.find((item) => item.id === id);
    item.likes_total += item.is_liked ? -1 : 1;
    item.is_liked = !item.is_liked;
    setItem(items);
  };

  const getItem = useCallback(async () => {
    try {
      const { data } = await api.get(`item/${itemId}`);
      setItem(data);
    } catch (error) {
      console.error();
    }
  }, [itemId]);

  useEffect(() => {
    getItem();
  }, [getItem]);

  const handleDelete = async () => {
    try {
      await api.delete(`item/${itemId}`);
      navigate(`/collection/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!item) {
    return <Spinner />;
  }
  return (
    <div
      className="flex justify-between  max-w-4xl mx-auto mt-8 p-5 border-2
                       rounded-md shadow-lg"
    >
      <div className="flex flex-col gap-4 max-w-3xl">
        <span>
          <b>Title:</b> {item.title}
        </span>
        <span>
          <b>Tags:</b> {item.tags.map((tag) => tag.title).join(", ")}
        </span>
        <span>
          <b>Created:</b> {getDateTime(item.created_at)}
        </span>
        {Object.values(OPTIONAL_FIELDS_NAMES).map((type) => {
          return FIELDS_COUNTERS.filter(
            (count) =>
              getInfoByCollection(type, count, item.collection)?.enabled
          ).map((count) => {
            const { name } = getInfoByCollection(type, count, item.collection);
            let value = item[getFieldName(type, count)];
            if (type === OPTIONAL_FIELDS_NAMES.CUSTOM_BOOL) {
              value = value ? "Yes" : "No";
            }
            const doubleDot = name.includes("?") ? "" : ":";
            return (
              <div key={count}>
                <b>
                  {name}
                  {doubleDot}
                </b>
                &nbsp;{value}
              </div>
            );
          });
        })}
        {checkUser(item?.user_id) && (
          <div>
            <IconButton
              onClick={() =>
                navigate(`/collection/${id}/item/${itemId}/edit-item`)
              }
            >
              <EditOutlinedIcon />
            </IconButton>
            <AlertButton
              buttonComponent={IconButton}
              buttonText={<DeleteOutlineRoundedIcon />}
              dialogTitle="Delete Item"
              dialogContent="Are you sure you want to delete this item?"
              onAgree={() => handleDelete(item.id)}
              disagreeText="Cancel"
              agreeText="Delete"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col items-center">
          <Checkbox
            onClick={() => toggleLike(item)}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            value={item.is_liked}
            checked={item.is_liked}
            color="error"
            // todo: render of disabled state should not be different then other view
            disabled={loading}
          />
          <span className="text-sm">{item.likes_total}</span>
        </div>
        <div>
          <Link component="button" onClick={() => navigate(-1)}>
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MoreItem;
