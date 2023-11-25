import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CreateCollectionButtons() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="contained"
        endIcon={<AddCircleIcon />}
        onClick={() => navigate("/create-collection")}
      >
        {t("btn.create")}
      </Button>
    </>
  );
}
