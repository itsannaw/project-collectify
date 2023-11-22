import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useNavigate } from "react-router-dom";

const MediaCards = ({ option }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col justify-center items-center max-w-[300px] w-full border-2 rounded-md shadow-lg transition-transform hover:scale-110 cursor-pointer"
      key={option.id}
    >
      <CardMedia
        component="img"
        sx={{ height: 180 }}
        src={option.image_url}
        title="image_collection"
      />
      <CardContent className="flex flex-col w-full">
        <span className="font-bold">{option.title}</span>
        <div className="truncate">
          <MarkdownPreview source={option.desc} />
        </div>
        <span>{option.theme}</span>
      </CardContent>
      <CardActions className="flex items-center justify-end">
        <Button
          size="small"
          onClick={() => navigate(`/collection/${option.id}`)}
        >
          Learn More
        </Button>
      </CardActions>
    </div>
  );
};

export default MediaCards;