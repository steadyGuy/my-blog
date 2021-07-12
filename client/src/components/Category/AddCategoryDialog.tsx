import { AppBar, Dialog, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../redux/actions/CategoryAction';
import { selectAuth } from '../../redux/selectors';
import { compare } from '../../utils/compareObjectByValues';
import { Input, InputStyled } from '../Input';
import { SubmitButton } from '../SubmitBtn';
import { useStyles } from './style';

type AddCategoryDialogProps = {
  open: boolean;
  handleClose: () => void;
}

const AddCategoryDialog: FC<AddCategoryDialogProps> = ({ open, handleClose }) => {
  const classes = useStyles();
  const formState = {
    name: '',
  }

  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: '',
    },
    // validationSchema: validateLogin(),
    onSubmit: values => {
      console.log(auth.accessToken)
      dispatch(createCategory(values.name, auth.accessToken));
    },
  });

  const handleSave = () => {
    formik.handleSubmit();
    handleClose();
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Добавить категорию
          </Typography>
          <Button className={classes.saveBtn} onClick={handleSave}>
            Сохранить
          </Button>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={formik.handleSubmit} className={classes.form}>

        <InputStyled title="Имя категории" inputTitle="Категория">
          <Input fullWidth={true} formik={formik} label="Name" autoFocus name="name" />
        </InputStyled>

        <SubmitButton disabled={compare(formState, formik.values)} className={classes.submit} title={"Сохранить"} />
      </form>
    </Dialog>
  );
}

export default AddCategoryDialog;
