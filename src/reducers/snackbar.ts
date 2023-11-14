import { createSlice } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material/Alert';

export interface Snackbar {
  open: boolean;
  alertColor: AlertColor;
  message: string;
}

export const initialState: Snackbar = {
  open: false,
  alertColor: 'success',
  message: 'Events Success!',
};

const SnackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbar: (state, action: { type: string; payload: Snackbar }) => {
      const { open, message, alertColor } = action.payload;
      state.open = open;
      state.message = message;
      state.alertColor = alertColor;
    },
    clearSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { setSnackbar, clearSnackbar } = SnackbarSlice.actions;

export default SnackbarSlice.reducer;