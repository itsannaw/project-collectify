import { Button, Input } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCallback, useEffect, useState } from "react";

function ImageUpload({ defaultValue, setValue }) {
  const [src, setSrc] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const updateByDefaultValue = useCallback(async () => {
    if (defaultValue) {
      setSrc(defaultValue);
    }
  }, [defaultValue]);
  useEffect(() => {
    updateByDefaultValue();
  }, [updateByDefaultValue]);

  return (
    <>
      <div className="flex flex-col items-center p-[16px] border rounded-lg">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="image-input"
        />
        <label htmlFor="image-input">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
          </Button>
        </label>
        {src && (
          <img
            src={src}
            alt="Selected Preview"
            style={{ maxWidth: "300px", marginTop: "16px" }}
          />
        )}
      </div>
    </>
  );
}

export default ImageUpload;
