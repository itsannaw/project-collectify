import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userStore from "../stores/userStore";
import api from "../api/http";

const CreateItem = () => {
  const { user } = userStore();
  const navigate = useNavigate();
  const { id } = useParams();
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
      await api.post("item", { ...forms });
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
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
