import { TextField } from "@mui/material";
import NavBar from "../components/NavBar/NavBar";
import MarkdownField from "../components/UserAccount/Collections/MarkdownField";
import ThemeSelection from "../components/UserAccount/Collections/ThemeSelection";

const CreateCollection = () => {
  return (
    <section>
      <div>
        <NavBar />
      </div>
      <div className="flex flex-col items-center justify-center mt-10 gap-10">
        <span className="text-[18px] font-bold">
          Here you can create your new collection!
        </span>
        <div className="flex flex-col gap-5 ">
          <div className="flex flex-col gap-2">
            <span className="font-bold">Title</span>
            <TextField label="Title" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold">Description</span>
            <MarkdownField />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Theme</span>
            <ThemeSelection />
          </div>
          <div><span>Picture</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateCollection;
