import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { formatDateToYYYYMMDD } from "../../helpers/date-utils";
import dayjs from "dayjs";

const ItemDateField = ({ value, setValue, label }) => {
  const handleChange = (e) => {
    setValue(formatDateToYYYYMMDD(e.$d));
  };
  console.log(value);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={dayjs(value) || ""}
          onChange={handleChange}
        />
      </LocalizationProvider>
    </div>
  );
};

export default ItemDateField;
