import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React, { Dispatch, FC, SetStateAction, useState } from 'react'

export interface IAlert {
  errors: string | string[] | null;
  severity?: 'success' | 'error' | 'warning' | 'info' | 'success';
  hideDuration?: number;
  handleClose: any;
}

function Alert(props: AlertProps) {
  // elevation -> Shadow depth, corresponds to dp in the spec. It accepts values between 0 and 24 inclusive.
  return <MuiAlert elevation={3} variant="filled" {...props} />;
}

export const Notification: FC<IAlert> = ({ handleClose, errors, severity = 'success', hideDuration = 5000 }) => {
  return (
    <Snackbar
      onClose={handleClose}
      open={!!errors}
      autoHideDuration={hideDuration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={severity} onClose={handleClose}>
        {errors}
      </Alert>
    </Snackbar>
  )
}
