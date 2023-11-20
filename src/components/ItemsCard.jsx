const ItemsCard = ({ options }) => {
  return (
    <>
      {options &&
        options.map((option) => (
          <div
            className="flex flex-col justify-between border-2
                       rounded-md shadow-lg transition-transform hover:scale-110 cursor-pointer"
            key={option.id}
          >
            <div className="flex">
              <span>
                <b>Title:</b> {option.title}
              </span>
            </div>
          </div>
        ))}
    </>
  );
};

export default ItemsCard;
