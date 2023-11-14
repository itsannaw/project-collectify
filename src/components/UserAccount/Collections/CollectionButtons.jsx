import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate } from "react-router-dom";

export default function CollectionButtons() {
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
      <Button variant="contained" endIcon={<BuildCircleIcon />} color="warning">
        Edit
      </Button>
      <Button variant="contained" endIcon={<RemoveCircleIcon />} color="error">
        Delete
      </Button>
    </>
  );
}
