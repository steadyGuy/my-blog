import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Box, IconButton, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../redux/selectors';
import { useState } from 'react';
import { ICategory } from '../../interfaces/category';
import { UpdateCategoryDialog } from './UpdateCategoryDialog';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 700,
    },
    wrapper: {
      marginTop: theme.spacing(8),
    },
    actionIcons: {
      '& > button:first-child': {
        marginRight: theme.spacing(0.5),
      }
    }
  }),
);

export const CategoriesTable = () => {
  const classes = useStyles();

  const categories = useSelector(selectCategories);
  const [edit, setEdit] = useState<ICategory | null>(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (category: ICategory) => {
    setEdit(category);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <UpdateCategoryDialog handleClose={handleClose} open={open} category={edit} title={`Обновить категорию`} />
      <TableContainer component={Paper} className={classes.wrapper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Имя категории</StyledTableCell>
              <StyledTableCell align="right">Действие</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <StyledTableRow key={category.id}>
                <StyledTableCell scope="row">
                  {category.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Box className={classes.actionIcons}>
                    <IconButton aria-label="delete" size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => handleEdit(category)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
