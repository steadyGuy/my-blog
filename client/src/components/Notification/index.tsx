import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React, { Dispatch, FC, SetStateAction } from 'react'

export interface IAlert {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info' | 'success';
  hideDuration?: number;
}

function Alert(props: AlertProps) {
  // elevation -> Shadow depth, corresponds to dp in the spec. It accepts values between 0 and 24 inclusive.
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Notification: FC<IAlert> = ({ open, setOpen, message, severity, hideDuration = 5000 }) => {

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={hideDuration} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        {message}
      </Alert>
    </Snackbar>
  )
}
