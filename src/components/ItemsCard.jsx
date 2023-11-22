import { Checkbox, Link } from "@mui/material";
import { getDateTime } from "../helpers/date-utils";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ItemsCard = ({ options }) => {
  const navigate = useNavigate();

  return (
    <>
      {options &&
        options.map((option) => (
          <div
            key={option.id}
            className="flex flex-col p-5 border-2 gap-4
          rounded-md shadow-lg transition-transform hover:scale-110 "
          >
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                <span>
                  <b>Title:</b> {option.title}
                </span>
                <span>
                  <b>Tags:</b> {option.tags.map((tag) => tag.title).join(", ")}
                </span>
                <span>
                  <b>Created:</b> {getDateTime(option.created_at)}
                </span>
              </div>
              <div className="flex flex-col items-center justify-between">
                <div className="flex flex-col items-center">
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    color="error"
                  />
                  <span className="text-sm">123</span>
                </div>
              </div>
            </div>
            <Link
              className="flex justify-center"
              component="button"
              onClick={() =>
                navigate(
                  `/collection/${option.collection.id}/item/${option.id}`
                )
              }
            >
              Learn more
            </Link>
          </div>
        ))}
    </>
  );
};

export default ItemsCard;
