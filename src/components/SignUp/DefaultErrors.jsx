const NAME_MAPPER = {
  first_name: "First name",
  last_name: "Last name",
  username: "Username",
  password: "Password",
  password_confirmation: "Password confirmation",
  email: "Email",
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const DefaultErrors = ({ errors }) => {
  return (
    <div className="flex flex-col text-red-500 text-[15px] gap-[5px]">
      {Object.keys(errors).map((key) => (
        <div className="" key={key}>
          <strong>{NAME_MAPPER[key]}:</strong>
          <ul>
            {errors[key].map((message, index) => (
              <li key={index}>• {capitalizeFirstLetter(message)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DefaultErrors;
