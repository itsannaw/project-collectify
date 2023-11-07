import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

export default function MarkdownField() {
  const [value, setValue] = useState("**Describe your collection!**");
  return (
    <div className="container">
      <MDEditor value={value} onChange={setValue} />
    </div>
  );
}
