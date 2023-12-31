import { Checkbox, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCallback, useEffect, useState } from "react";
import { OPTIONAL_FIELDS_NAMES } from "../../../const/collections";
import i18next from "i18next";

const ITEM_IDS = {
  ONE: "1",
  TWO: "2",
  THREE: "3",
};
const ITEM_IDS_ITER = Object.values(ITEM_IDS);

const getName = (name, id, isText = false) =>
  `${name}${id}_${isText ? "name" : "enabled"}`;

const AdaptiveFields = ({ value, setValue, name }) => {
  const TITLE_MAPPER = () => {
    return {
      [OPTIONAL_FIELDS_NAMES.CUSTOM_STRING]: i18next.t("create.str"),
      [OPTIONAL_FIELDS_NAMES.CUSTOM_TEXT]: i18next.t("create.text_long"),
      [OPTIONAL_FIELDS_NAMES.CUSTOM_INT]: i18next.t("create.num"),
      [OPTIONAL_FIELDS_NAMES.CUSTOM_BOOL]: i18next.t("create.bool"),
      [OPTIONAL_FIELDS_NAMES.CUSTOM_DATE]: i18next.t("create.date"),
    };
  };

  const defaultFields = Object.values(ITEM_IDS).reduce((acc, id) => {
    acc[getName(name, id)] = false;
    acc[getName(name, id, true)] = "";

    return acc;
  }, {});
  const [fields, setFields] = useState(defaultFields);
  const handleChange = useCallback(
    ({ v, id, isText }) => {
      setFields((prevFields) => ({
        ...prevFields,
        [getName(name, id, isText)]: v,
      }));
      setValue((prevValue) => ({
        ...prevValue,
        ...fields,
        [getName(name, id, isText)]: v,
      }));
    },
    [name, setValue, fields]
  );
  useEffect(() => {
    if (value) {
      setFields(value);
    }
  }, [value]);
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="content"
          id="header"
        >
          <span className="text-[15px] font-semibold">
            {TITLE_MAPPER()[name]}
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-3 items-center">
            {ITEM_IDS_ITER.map((id) => {
              return (
                <div key={id}>
                  <Checkbox
                    checked={fields[getName(name, id)] || false}
                    onChange={(e) => handleChange({ v: e.target.checked, id })}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <TextField
                    size="small"
                    value={fields[getName(name, id, true)] || ""}
                    onChange={(e) =>
                      handleChange({
                        v: e.target.value,
                        id,
                        isText: true,
                      })
                    }
                  />
                </div>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AdaptiveFields;
