import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

export default function CreateCollectionButtons() {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="contained"
        endIcon={<AddCircleIcon />}
        onClick={() => navigate("/create-collection")}
      >
        Create
      </Button>
    </>
  );
}
