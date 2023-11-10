import { TextField } from "@mui/material";
import NavBar from "../components/NavBar/NavBar";
import MarkdownField from "../components/UserAccount/Collections/MarkdownField";
import ThemeSelection from "../components/UserAccount/Collections/ThemeSelection";
import UploadImages from "../components/UserAccount/Collections/UploadImages";
import StringFields from "../components/UserAccount/Collections/TypeFields/StringFields";
import LongTextFields from "../components/UserAccount/Collections/TypeFields/LongTextFields";
import NumberFields from "../components/UserAccount/Collections/TypeFields/NumberFields";
import BoolFields from "../components/UserAccount/Collections/TypeFields/BoolFields";
import DataFields from "../components/UserAccount/Collections/TypeFields/DataFields";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { unauthorizedApi } from "../api/http";
import { useNavigate } from "react-router-dom";

const CreateCollection = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState({
    title: "",
    desc: "",
    image_url: "",
    category_id: "",
    user_id: "",
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

      await unauthorizedApi.post("collection", {
        ...forms,
      });
      navigate("/user");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div>
        <NavBar />
      </div>
      <div className="flex flex-col items-center justify-center mt-5 gap-8 p-5">
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
            <MarkdownField onChange={handleChange} value={forms.desc} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Theme*</span>
            <ThemeSelection value={forms.category_id} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Picture*</span>
            <UploadImages value={forms.image_url} onChange={handleChange} />
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
          <StringFields />
          <LongTextFields />
          <NumberFields />
          <BoolFields />
          <DataFields />
        </div>
        <div className="flex justify-center">
          <LoadingButton
            onClick={handleSubmit}
            method="post"
            variant="contained"
          >
            Create
          </LoadingButton>
        </div>
      </div>
    </section>
  );
};

export default CreateCollection;
