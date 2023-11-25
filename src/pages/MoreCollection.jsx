import { useCallback, useEffect, useState } from "react";
import api from "../api/http";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useNavigate, useParams } from "react-router-dom";
import { getDateTime } from "../helpers/date-utils";
import { Button, Rating } from "@mui/material";
import ItemsCard from "../components/ItemsCard";
import { useCheckUser } from "../hooks/useCheckUser";
import { AlertButton } from "../components/UI/AlertButton";
import { useTranslation } from "react-i18next";
import { Spinner } from "../components/UI/Spinner";

const MoreCollection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const { id } = useParams();

  const getCollection = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`collection/${id}`);
      setCollection(data);
      setLoading(false);
    } catch (error) {
      console.error;
    }
  }, [id]);

  const deleteCollection = async () => {
    try {
      await api.delete(`collection/${id}`);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const getItems = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`items/${id}`);
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const onRating = async (rating) => {
    if (loading) return;
    setLoading(true);
    try {
      const payload = {
        rating,
      };
      await api.post(`rating/${id}`, payload);
      collection.rating = rating;
      setCollection(collection);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollection();
    getItems();
  }, [getCollection, getItems]);

  const { checkUser } = useCheckUser();

  if (!collection || loading) {
    return <Spinner />;
  }

  return (
    <div
      className="flex flex-col items-center
     relative max-w-[1400px] gap-5 mx-auto border
      rounded-xl shadow-lg m-10 p-5"
    >
      <div className="flex absolute right-5">
        {checkUser(collection?.user_id) && (
          <>
            <Button
              color="warning"
              onClick={() => navigate(`/edit-collection/${id}`)}
            >
              {t("btn.edit")}
            </Button>
            <AlertButton
              buttonComponent={Button}
              buttonText={t("btn.delete")}
              buttonColor="error"
              dialogTitle={t("alert.title_del_col")}
              dialogContent={t("alert.content_del_col")}
              onAgree={() => deleteCollection}
              disagreeText={t("alert.cancel")}
              agreeText={t("alert.delete")}
            />
          </>
        )}
      </div>

      <div
        className="flex flex-col items-center gap-5
       max-w-[800px] w-full border rounded-xl p-5"
      >
        <div className="flex relative justify-center w-full items-start">
          <div className="flex flex-col items-center absolute left-0 ">
            <Rating
              name="rating"
              value={collection.rating || null}
              onChange={(event, newValue) => {
                onRating(newValue);
              }}
            />
            <span className="text-sm">{collection.rating_total}</span>
          </div>

          <img
            className="w-[300px] h-[300px]"
            src={collection?.image_url}
            alt="#"
          />
        </div>
        <span className="text-xl font-bold">{collection?.title}</span>

        <MarkdownPreview source={collection?.desc} />

        <div className="flex flex-col gap-3 justify-start w-full">
          <span>
            <b>{t("card.theme")}:</b> {collection?.category?.title}
          </span>
          <span className="flex gap-2 items-center">
            <b>{t("card.creator")}:</b>{" "}
            {collection.user?.avatar && (
              <img
                className="h-[25px] w-[25px]"
                src={collection.user?.avatar}
                alt="avatar"
              />
            )}
            {collection.user?.first_name} {collection.user?.last_name} (@
            {collection.user?.username})
          </span>
          <span>
            <b>{t("card.created")}:</b> {getDateTime(collection?.created_at)}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {checkUser(collection?.user_id) && (
          <Button onClick={() => navigate(`/collection/${id}/create-item`)}>
            {t("card.add_item")}
          </Button>
        )}
      </div>
      <div className="flex flex-col max-w-2xl mx-auto w-full gap-5">
        <ItemsCard setOptions={setItems} options={items} />
      </div>
    </div>
  );
};

export default MoreCollection;
