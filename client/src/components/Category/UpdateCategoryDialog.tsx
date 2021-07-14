import { Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button } from '@material-ui/core';
import { ICategory } from '../../interfaces/category';

import { ChangeEvent, FC, useEffect, useState } from 'react'

type UpdateCategoryDialogProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  category: ICategory | null;
}

export const UpdateCategoryDialog: FC<UpdateCategoryDialogProps> = (
  { open, handleClose, title, category }
) => {

  const [updatedCategory, setupdatedCategory] = useState<ICategory | null>(null);

  useEffect(() => {
    if (category) {
      setupdatedCategory(category);
    }
  }, [category])

  const handleUpdate = () => {
    handleClose();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setupdatedCategory((prev: any) => {
      if (prev) {
        return { ...prev, [name]: value };
      }
    });
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-update" maxWidth='sm' fullWidth>
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      {console.log('updatedCategory', category)}
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Имя категории"
          value={updatedCategory?.name}
          onChange={handleChange}
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
