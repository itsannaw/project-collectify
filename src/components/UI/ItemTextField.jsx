import MDEditor from "@uiw/react-md-editor";

const ItemTextField = ({ value, setValue, label }) => {
  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <span className="font-bold">{label}*</span>
      <MDEditor value={value} onChange={setValue} />
    </div>
  );
};

export default ItemTextField;
