import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const AlertButton = ({
  buttonComponent: ButtonComponent,
  buttonText,
  buttonColor = "default",
  dialogTitle,
  dialogContent,
  onAgree,
  disagreeText = "Disagree",
  agreeText = "Agree",
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    onAgree();
    handleClose();
  };

  return (
    <>
      <ButtonComponent color={buttonColor} onClick={handleClickOpen}>
        {buttonText}
      </ButtonComponent>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{disagreeText}</Button>
          <Button onClick={handleAgree} autoFocus>
            {agreeText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
