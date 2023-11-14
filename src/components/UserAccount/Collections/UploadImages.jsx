import { useState } from "react";
import { Button, Input } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
            color="inherit"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
          </Button>
        </label>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected Preview"
            style={{ maxWidth: "300px", marginTop: "16px" }}
          />
        )}
      </div>
    </>
  );
}

export default ImageUpload;
