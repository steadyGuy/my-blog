import { Box, createStyles, makeStyles, Typography, Theme, Button } from '@material-ui/core'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCategoryDialog from '../components/Category/AddCategoryDialog';
import { CategoriesTable } from '../components/Category/CategoriesTable';
import NotFound from '../components/global/NotFound/NotFound';
import { getCategories } from '../redux/actions/CategoryAction';
import { selectAuth, selectCategories } from '../redux/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {

    },
    button: {
      textTransform: 'uppercase',
      minWidth: 176,
    }
  }),
);

const Category = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  useEffect(() => {

    dispatch(getCategories());

  }, [dispatch])

  if (auth.user?.role !== 'admin') {
    return <NotFound />
  }

  return (
    <>
      <Box mt={3} mb={2}>
        <Typography variant="h2" className={classes.title}>Категории</Typography>
      </Box>
      <AddCategoryDialog handleClose={handleClose} open={open} />
      <Button
        onClick={handleClickOpen}
        className={classes.button}
        size="large"
        variant="contained"
        color="primary"
      >
        Добавить
      </Button>
      <CategoriesTable />
    </>
  )
}

export default Category
