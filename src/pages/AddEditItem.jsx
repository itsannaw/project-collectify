import { Autocomplete, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userStore from "../stores/userStore";
import api from "../api/http";
import collectionStore from "../stores/collectionStore";
import { FIELDS_COUNTERS, OPTIONAL_FIELDS_NAMES } from "../const/collections";
import ItemIntField from "../components/UI/ItemIntField";
import ItemStringField from "../components/UI/ItemStringField";
import ItemTextField from "../components/UI/ItemTextField";
import ItemBoolField from "../components/UI/ItemBoolField";
import ItemDateField from "../components/UI/ItemDateField";
import { getFieldName, getInfoByCollection } from "../helpers/collections";

const COMPONENT_MAPPER = {
  [OPTIONAL_FIELDS_NAMES.CUSTOM_STRING]: ItemStringField,
  [OPTIONAL_FIELDS_NAMES.CUSTOM_BOOL]: ItemBoolField,
  [OPTIONAL_FIELDS_NAMES.CUSTOM_DATE]: ItemDateField,
  [OPTIONAL_FIELDS_NAMES.CUSTOM_TEXT]: ItemTextField,
  [OPTIONAL_FIELDS_NAMES.CUSTOM_INT]: ItemIntField,
};

const AddEditItem = ({ isEdit }) => {
  const { user } = userStore();
  const navigate = useNavigate();
  const { id, itemId } = useParams();
  const { collection, setCollection } = collectionStore();
  const [tags, setTags] = useState([]);
  const [tips, setTips] = useState([]);
  const [forms, setForms] = useState({
    title: "",
    user_id: user.id,
    collection_id: id,
  });

  const getTags = async () => {
    try {
      const { data } = await api.get("tags");
      setTips(data.map((tag) => tag.title));
    } catch (error) {
      console.error(error);
    }
  };

  const getItem = useCallback(async () => {
    try {
      const { data } = await api.get(`item/${itemId}`);
      setCollection(data.collection);
      setForms(data);
      setTags(data.tags.map((t) => t.title));
    } catch (error) {
      console.error(error);
    }
  }, [itemId, setCollection]);

  const onMounted = useCallback(async () => {
    await getTags();
    if (isEdit) {
      await getItem();
    }
  }, [getItem, isEdit]);

  useEffect(() => {
    onMounted();
  }, [onMounted]);

  const handleChange = (e) => {
    setForms({
      ...forms,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...forms, tags };
      if (isEdit) {
        await api.put(`items/${itemId}`, payload);
        // todo: navigate + error handles
      } else {
        await api.post("items", payload);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response?.data.errors) {
        console.log(error.response.data.errors);
      }
      console.error(error);
    }
  };

  const handleChangeTags = (e, tags) => {
    setTags(tags);
  };
  const setCustomField = (type, count, v) => {
    setForms({
      ...forms,
      [getFieldName(type, count)]: v,
    });
  };
  const getInfo = (type, count) => {
    return getInfoByCollection(type, count, collection);
  };
  const getLabel = (type, count) => getInfo(type, count).name;

  return (
    <div className="flex flex-col items-center justify-center mt-5 gap-8 p-5">
      <span className="text-[18px] font-bold">
        {isEdit
          ? "Edit an item of the collection!"
          : "Add an item to the collection!"}
      </span>
      <div className="flex flex-col gap-5 ">
        <div className="flex flex-col gap-2">
          <span className="font-bold">Title</span>
          <TextField
            onChange={handleChange}
            name="title"
            value={forms.title}
            required
          />
          <span className="font-bold">Tags</span>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={tips}
            freeSolo
            autoSelect
            value={tags}
            onChange={handleChangeTags}
            renderInput={(params) => <TextField {...params} value={tags} />}
          />
        </div>
        {Object.entries(COMPONENT_MAPPER).map(([type, Component]) => {
          return FIELDS_COUNTERS.filter(
            (count) => getInfo(type, count)?.enabled
          ).map((count) => {
            return (
              <Component
                key={count}
                value={forms[getFieldName(type, count)]}
                setValue={(v) => setCustomField(type, count, v)}
                label={getLabel(type, count)}
              />
            );
          });
        })}
        <div className="flex justify-center">
          <LoadingButton
            onClick={handleSubmit}
            method="put"
            variant="contained"
          >
            {isEdit ? "Update" : "Create"}
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default AddEditItem;
