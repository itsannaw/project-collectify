import { Checkbox, TextField } from "@mui/material";
import NavBar from "../components/NavBar/NavBar";
import MarkdownField from "../components/UserAccount/Collections/MarkdownField";
import ThemeSelection from "../components/UserAccount/Collections/ThemeSelection";
import UploadImages from "../components/UserAccount/Collections/UploadImages";

const CreateCollection = () => {
  return (
    <section>
      <div>
        <NavBar />
      </div>
      <div className="flex flex-col items-center justify-center mt-10 gap-8">
        <span className="text-[18px] font-bold">
          Here you can create your new collection!
        </span>
        <div className="flex flex-col gap-5 ">
          <div className="flex flex-col gap-2">
            <span className="font-bold">Title*</span>
            <TextField required />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold">Description*</span>
            <MarkdownField />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Theme*</span>
            <ThemeSelection />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Picture*</span>
            <UploadImages />
          </div>
        </div>
        <div>
          <span className="font-bold">
            Add customizable fields for future items (if necessary)
          </span>
        </div>
        <div className="flex items-center">
          <Checkbox />
          <TextField size="small" />
        </div>
      </div>
    </section>
  );
};

export default CreateCollection;
