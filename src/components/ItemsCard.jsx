import { getDateTime } from "../helpers/date-utils";

const ItemsCard = ({ options }) => {
  return (
    <>
      {options &&
        options.map((option) => (
          <div
            className="flex flex-col justify-between p-5 border-2
                       rounded-md shadow-lg transition-transform hover:scale-110 cursor-pointer"
            key={option.id}
          >
            <div className="flex flex-col gap-4 ">
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
          </div>
        ))}
    </>
  );
};

export default ItemsCard;
