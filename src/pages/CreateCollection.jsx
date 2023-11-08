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

const CreateCollection = () => {
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
          <LoadingButton variant="contained">Create</LoadingButton>
        </div>
      </div>
    </section>
  );
};

export default CreateCollection;
