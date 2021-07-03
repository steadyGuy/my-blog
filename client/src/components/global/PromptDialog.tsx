import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React, { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginSMSEnd } from '../../redux/actions/AuthActions';
import { ALERT } from '../../redux/constants/alertType';
import { AUTH_SMS_DIALOG } from '../../redux/constants/authType';

type PromptDialogProps = {
  open: boolean;
  phone: string;
}

export const PromptDialog: FC<PromptDialogProps> = ({ open, phone }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');

  const handleClose = () => {
    dispatch({ type: AUTH_SMS_DIALOG, payload: false });
  };

  const handleCloseWithMessage = () => {
    if (code.length !== 6) {
      return dispatch({ type: ALERT, payload: { errors: 'Длина sms должна быть 6 символов' } });
    }
    handleClose();
    dispatch(loginSMSEnd(code, phone));
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Введите sms-код</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для подтверждения авторизации аккаунта вы должны ввести код подтверждения
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="sms"
            label="Sms код"
            type="text"
            fullWidth
            value={code}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleCloseWithMessage} color="primary">
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}