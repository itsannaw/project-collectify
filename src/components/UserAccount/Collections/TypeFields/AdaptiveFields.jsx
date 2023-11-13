import { Checkbox, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCallback, useState } from "react";
import { OPTIONAL_FIELDS_NAMES } from "../../../../const/collections";

const ITEM_IDS = {
  ONE: "1",
  TWO: "2",
  THREE: "3",
};

const TITLE_MAPPER = {
  [OPTIONAL_FIELDS_NAMES.CUSTOM_STRING]: "String (short text)",
  [OPTIONAL_FIELDS_NAMES.CUSTOM_TEXT]: "Text (long text)",
  [OPTIONAL_FIELDS_NAMES.CUSTOM_INT]: "Number",
  [OPTIONAL_FIELDS_NAMES.CUSTOM_BOOL]: "Yes or no",
  [OPTIONAL_FIELDS_NAMES.CUSTOM_DATE]: "Date",
};

const getName = (name, id, isText = false) =>
  `${name}${id}_${isText ? "name" : "enabled"}`;

const AdaptiveFields = ({ setValue, name }) => {
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
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="content"
          id="header"
        >
          <span className="text-[15px] font-semibold">
            {TITLE_MAPPER[name]}
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-3 items-center">
            <div>
              <Checkbox
                checked={fields[getName(name, ITEM_IDS.ONE)]}
                onChange={(e) =>
                  handleChange({ v: e.target.checked, id: ITEM_IDS.ONE })
                }
              />
              <TextField
                size="small"
                value={fields[getName(name, ITEM_IDS.ONE, true)]}
                onChange={(e) =>
                  handleChange({
                    v: e.target.value,
                    id: ITEM_IDS.ONE,
                    isText: true,
                  })
                }
              />
            </div>
            <div>
              <Checkbox
                checked={fields[getName(name, ITEM_IDS.TWO)]}
                onChange={(e) =>
                  handleChange({ v: e.target.checked, id: ITEM_IDS.TWO })
                }
              />
              <TextField
                size="small"
                value={fields[getName(name, ITEM_IDS.TWO, true)]}
                onChange={(e) =>
                  handleChange({
                    v: e.target.value,
                    id: ITEM_IDS.TWO,
                    isText: true,
                  })
                }
              />
            </div>
            <div>
              <Checkbox
                checked={fields[getName(name, ITEM_IDS.THREE)]}
                onChange={(e) =>
                  handleChange({ v: e.target.checked, id: ITEM_IDS.THREE })
                }
              />
              <TextField
                size="small"
                value={fields[getName(name, ITEM_IDS.THREE, true)]}
                onChange={(e) =>
                  handleChange({
                    v: e.target.value,
                    id: ITEM_IDS.THREE,
                    isText: true,
                  })
                }
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AdaptiveFields;
