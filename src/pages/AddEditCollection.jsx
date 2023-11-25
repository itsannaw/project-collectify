import { TextField } from "@mui/material";
import ListSelection from "../components/UserAccount/Collections/ListSelection";
import MarkdownField from "../components/UserAccount/Collections/MarkdownField";
import UploadImages from "../components/UserAccount/Collections/UploadImages";
import { LoadingButton } from "@mui/lab";
import { useCallback, useEffect, useState } from "react";
import api from "../api/http";
import { useNavigate, useParams } from "react-router-dom";
import AdaptiveFields from "../components/UserAccount/Collections/AdaptiveFields";
import { OPTIONAL_FIELDS } from "../const/collections";
import { getFormData } from "../helpers";
import collectionStore from "../stores/collectionStore";
import { useTranslation } from "react-i18next";

const DEFAULT_FORM_STATE = {
  title: "",
  desc: "",
  file: "",
  category_id: "",
  user_id: "",
};

const AddEditCollection = ({ isEdit }) => {
  const { t } = useTranslation();
  const { collection, getCollection } = collectionStore();
  const navigate = useNavigate();
  const { id } = useParams();

  const [forms, setForms] = useState({ ...DEFAULT_FORM_STATE });

  const handleFormItemChange = (prop, value) => {
    setForms({
      ...forms,
      [prop]: value,
    });
  };

  const handleChange = (e) => {
    handleFormItemChange(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = getFormData(forms);
      await api.put(`collection/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/collection/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const { data } = await api.get("categories");
      setCategories(data);
    } catch (error) {
      console.error;
    }
  };
  const getDataOnMounted = useCallback(async () => {
    await getCategories();
    await getCollection(id);
  }, [getCollection, id]);

  useEffect(() => {
    getDataOnMounted();
  }, [getDataOnMounted]);

  useEffect(() => {
    if (collection) {
      setForms(collection);
    } else {
      setForms({ ...DEFAULT_FORM_STATE });
    }
  }, [collection]);

  return (
    <div
      className="flex flex-col items-center max-w-[600px] mx-auto
     justify-center mt-5 gap-8 p-5"
    >
      <span className="text-[18px] font-bold">
        {isEdit
          ? "Edit collection"
          : "Here you can create your new collection!"}
      </span>
      <div className="flex flex-col gap-5 ">
        <div className="flex flex-col gap-2">
          <span className="font-bold">{t("create.title")}*</span>
          <TextField
            onChange={handleChange}
            name="title"
            value={forms.title}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-bold">{t("create.desc")}*</span>
          <MarkdownField
            setValue={(e) => handleFormItemChange("desc", e)}
            value={forms.desc}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">{t("create.theme")}*</span>
          <ListSelection
            value={forms.category_id}
            setValue={(e) => handleFormItemChange("category_id", e)}
            options={categories}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">{t("create.pic")}*</span>
          <UploadImages
            defaultValue={collection?.image_url}
            setValue={(e) => handleFormItemChange("file", e)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="font-bold">{t("create.cust_text1")}</span>
        <span className="text-[15px] opacity-80">{t("create.cust_text2")}</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        {OPTIONAL_FIELDS.map((name) => {
          return (
            <AdaptiveFields
              key={name}
              value={forms}
              setValue={setForms}
              name={name}
            />
          );
        })}
      </div>
      <div className="flex justify-center">
        <LoadingButton onClick={handleSubmit} method="post" variant="contained">
          {isEdit ? "Edit" : "Create"}
        </LoadingButton>
      </div>
    </div>
  );
};

export default AddEditCollection;
