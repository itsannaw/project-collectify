import { TextField } from "@mui/material";
import NavBar from "../components/NavBar/NavBar";
import MarkdownField from "../components/UserAccount/MarkdownField";

const CreateCollection = () => {
  return (
    <section>
      <div>
        <NavBar />
      </div>
      <div className="flex flex-col items-center justify-center mt-10 gap-10">
        <span className="font-bold">
          Here you can create your new collection!
        </span>
        <div className="flex flex-col gap-5 items-center">
          <TextField label="Title" />
          <MarkdownField />
        </div>
      </div>
    </section>
  );
};

export default CreateCollection;
