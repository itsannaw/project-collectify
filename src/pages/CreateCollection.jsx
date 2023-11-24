import { TextField } from "@mui/material";
import ListSelection from "../components/UserAccount/Collections/ListSelection";
import MarkdownField from "../components/UserAccount/Collections/MarkdownField";
import UploadImages from "../components/UserAccount/Collections/UploadImages";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import api from "../api/http";
import { useNavigate } from "react-router-dom";
import AdaptiveFields from "../components/UserAccount/Collections/AdaptiveFields";
import { OPTIONAL_FIELDS } from "../const/collections";
import { getFormData } from "../helpers";
import userStore from "../stores/userStore";

const CreateCollection = () => {
  const navigate = useNavigate();
  const { user } = userStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forms, setForms] = useState({
    title: "",
    desc: "",
    file: "",
    category_id: "",
    user_id: "",
  });

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
    setLoading(true);
    try {
      e.preventDefault();
      const formData = getFormData(forms);
      await api.post("collection", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      navigate(`/user/${user.username}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(
        "Failed! Check if the fields are filled in correctly (mandatory fields are marked with an asterisk)."
      );
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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex flex-col items-center max-w-[600px] mx-auto  justify-center mt-5 gap-8 p-5">
      <span className="text-[18px] font-bold">
        Here you can create your new collection!
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

        <div className="flex flex-col gap-2">
          <span className="font-bold">Description*</span>
          <MarkdownField
            setValue={(e) => handleFormItemChange("desc", e)}
            value={forms.desc}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Theme*</span>
          <ListSelection
            value={forms.category_id}
            setValue={(e) => handleFormItemChange("category_id", e)}
            options={categories}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Picture*</span>
          <UploadImages setValue={(e) => handleFormItemChange("file", e)} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="font-bold">
          Add customizable fields for future items (if necessary)
        </span>
        <span className="text-[15px] opacity-80">
          You must enter the name and type of the future input field...
        </span>
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
      {error && <span className="text-red-500 text-center">{error}</span>}
      <div className="flex justify-center gap-4">
        <LoadingButton
          onClick={handleSubmit}
          method="post"
          variant="contained"
          loading={loading}
        >
          Create
        </LoadingButton>
      </div>
    </div>
  );
};

export default CreateCollection;
