import * as React from "react";
import MUISnackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { clearSnackbar } from "../reducers/snackbar";
import { RootState } from "../store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbar() {
  const dispatch = useDispatch();
  const { open, alertColor, message } = useSelector(
    (state: RootState) => state.snackbarReducer
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (event) {
      event?.preventDefault();
    }

    if (reason === "clickaway") {
      return;
    }
    dispatch(clearSnackbar());
  };

  return (
    <MUISnackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertColor} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MUISnackbar>
  );
}