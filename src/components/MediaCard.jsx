import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MediaCard = ({ option }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col justify-center items-center max-w-[300px]
       w-full border-2 rounded-md shadow-lg transition-transform
       hover:scale-110 cursor-pointer"
      key={option?.id}
    >
      <CardMedia
        component="img"
        sx={{ height: 180 }}
        src={option?.image_url}
        title="image_collection"
      />
      <CardContent className="flex flex-col w-full gap-2">
        <span className="font-bold">{option?.title}</span>
        <div className="truncate">
          <MarkdownPreview source={option?.desc} />
        </div>
        <div className="flex flex-col gap-2">
          {option.rating_total && (
            <span className="text-sm">
              <b>{t("card.rating")}:</b> {option.rating_total}
            </span>
          )}
          <span className="text-sm">
            <b>{t("card.creator")}:</b> {option.user.username}
          </span>
        </div>
      </CardContent>
      <CardActions className="flex items-center justify-end">
        <Button
          size="small"
          onClick={() => navigate(`/collection/${option.id}`)}
        >
          {t("card.more")}
        </Button>
      </CardActions>
    </div>
  );
};

export default MediaCard;
