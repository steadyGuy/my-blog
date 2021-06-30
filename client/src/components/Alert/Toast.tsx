import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unsetAlertState } from '../../redux/actions/AlertAction';
import { selectAlert } from '../../redux/selectors';

type ToastProps = {
  body: string | string[] | undefined
  severity: 'success' | 'error' | 'warning' | 'info' | 'success';
}

export const Toast: FC<ToastProps> = ({ body, severity }) => {
  const state = useSelector(selectAlert);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(unsetAlertState());
  }

  const MyAlert = () => {
    return <MuiAlert
      severity={severity}
      elevation={3}
      variant="filled"
      onClose={handleClose}
    >
      {
        typeof (body) === 'string'
          ? body
          : <ul>
            {
              body?.map((text: string, index: number) => (
                <li key={index}>{text}</li>
              ))
            }
          </ul>
      }
    </MuiAlert>;
  }

  return (
    <Snackbar
      onClose={handleClose}
      open={!!state.errors || !!state.success}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <MyAlert />
    </Snackbar>
  )
}
