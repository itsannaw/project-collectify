import { Autocomplete, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userStore from "../stores/userStore";
import api from "../api/http";

const CreateItem = () => {
  const { user } = userStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [tags, setTags] = useState([]);
  const [forms, setForms] = useState({
    title: "",
    user_id: user.id,
    collection_id: id,
  });

  const handleChange = (e) => {
    setForms({
      ...forms,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await api.post("items", { ...forms, tags });
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeTags = (e, tags) => {
    setTags(tags);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 gap-8 p-5">
      <span className="text-[18px] font-bold">
        Add an item to the collection!
      </span>
      <div className="flex flex-col gap-5 ">
        <div className="flex flex-col gap-2">
          <span className="font-bold">Title*</span>
          <TextField
            onChange={handleChange}
            name="title"
            value={forms.title}
            required
          />
          <span className="font-bold">Tags*</span>
          <Autocomplete
            style={{ margin: "10px 0" }}
            multiple
            id="tags-outlined"
            options={[]}
            freeSolo
            autoSelect
            value={tags}
            onChange={handleChangeTags}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="Tags"
                value={tags}
              />
            )}
          />
        </div>
        <div className="flex justify-center">
          <LoadingButton
            onClick={handleSubmit}
            method="post"
            variant="contained"
          >
            Add
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
