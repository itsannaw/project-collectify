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

const MoreCollection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState([]);
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

  const getItems = useCallback(async () => {
    try {
      const { data } = await api.get(`items/${id}`);
      setItems(data);
    } catch (error) {
      console.error;
    }
  }, [id]);

  useEffect(() => {
    getCollections();
    getItems();
  }, [getCollections, getItems]);

  const { checkUser } = useCheckUser();

  return (
    <div className="flex flex-col items-center relative max-w-[1400px] gap-5 mx-auto border rounded-xl shadow-lg m-10 p-5">
      <div className="flex absolute right-5">
        {checkUser(collections?.user_id) && (
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
        </div>
        <span className="text-xl font-bold">{collections?.title}</span>

        <MarkdownPreview source={collections?.desc} />

        <div className="flex flex-col gap-3 justify-start w-full">
          <span>
            <b>{t("card.theme")}:</b> {collections?.category?.title}
          </span>
          <span className="flex gap-2 items-center">
            <b>{t("card.creator")}:</b>{" "}
            <img
              className="h-[25px] w-[25px]"
              src={collections.user?.avatar}
              alt="avatar"
            />
            {collections.user?.first_name} {collections.user?.last_name} (@
            {collections.user?.username})
          </span>
          <span>
            <b>{t("card.created")}:</b> {getDateTime(collections?.created_at)}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {checkUser(collections?.user_id) && (
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
