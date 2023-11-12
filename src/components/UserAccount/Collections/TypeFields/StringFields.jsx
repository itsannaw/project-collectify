import { Checkbox, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StringFields = () => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="content"
          id="header"
        >
          <span className="text-[15px] font-semibold">String (short text)</span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-3 items-center">
            <div>
              <Checkbox />
              <TextField size="small" />
            </div>
            <div>
              <Checkbox />
              <TextField size="small" />
            </div>
            <div>
              <Checkbox />
              <TextField size="small" />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default StringFields;
