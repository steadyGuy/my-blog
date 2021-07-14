import { Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button } from '@material-ui/core';
import { ICategory } from '../../interfaces/category';

import { FC } from 'react'

type UpdateCategoryDialogProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  category: ICategory | null;
}

export const UpdateCategoryDialog: FC<UpdateCategoryDialogProps> = (
  { open, handleClose, title, category }
) => {

  const handleUpdate = () => {
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-update" maxWidth='sm' fullWidth>
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Category name"
          value={category?.name}
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Обновить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
