import { Checkbox, Link } from "@mui/material";
import { getDateTime } from "../helpers/date-utils";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../api/http";
import { useState } from "react";
import userStore from "../stores/userStore";

const ItemsCard = ({ options, setOptions }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = userStore();
  const [loading, setLoading] = useState(false);

  const toggleLike = async ({ id, is_liked }) => {
    if (!user) return;
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
    const items = [...options];
    const item = items.find((item) => item.id === id);
    item.likes_total += item.is_liked ? -1 : 1;
    item.is_liked = !item.is_liked;
    setOptions(items);
  };

  if (options.length === 0) {
    return <p>{t("error.items")}</p>;
  }

  return (
    <>
      {options &&
        options.map((option) => (
          <div
            key={option.id}
            className="flex flex-col max-w-xl w-full mx-auto p-5 border-2 gap-4
          rounded-md shadow-lg transition-transform hover:scale-110 "
          >
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                <span>
                  <b>{option.title}</b>
                </span>
                <span>
                  <b>{t("card.tags")}:</b>{" "}
                  {option.tags.map((tag) => tag.title).join(", ")}
                </span>
                <span>
                  <b>{t("card.collection")}:</b>{" "}
                  <Link
                    onClick={() =>
                      navigate(`/collection/${option.collection.id}`)
                    }
                    color="inherit"
                    component="button"
                  >
                    {option.collection.title}
                  </Link>
                </span>
                <span>
                  <b>{t("card.created")}:</b> {getDateTime(option.created_at)}
                </span>
              </div>
              <div className="flex flex-col items-center justify-between">
                <div className="flex flex-col items-center">
                  <Checkbox
                    onClick={() => toggleLike(option)}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    value={option.is_liked}
                    checked={option.is_liked}
                    color="error"
                    disabled={loading}
                  />
                  <span className="text-sm">{option.likes_total}</span>
                </div>
              </div>
            </div>
            <Link
              className="flex justify-center"
              component="button"
              onClick={() =>
                navigate(
                  `/collection/${option.collection.id}/item/${option.id}`
                )
              }
            >
              {t("card.more")}
            </Link>
          </div>
        ))}
    </>
  );
};

export default ItemsCard;
