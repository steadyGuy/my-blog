import { Box, createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { CreateForm } from '../components/cards/CreateForm';
import { HorizontalCard } from '../components/cards/HorizontalCard';
import NotFound from '../components/global/NotFound/NotFound';
import { selectAuth, selectCategories } from '../redux/selectors';
import { validateArticle } from '../utils/validateAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {

    },
    paper: {

    },
  }),
);

const CreateArticle = () => {
  const classes = useStyles();
  const initialState = {
    user: '',
    title: '',
    content: '',
    description: '',
    thumbnail: null,
    category: '',
    createdAt: new Date().toLocaleString(),
  }

  const formikArticle = useFormik({
    validateOnChange: false,
    initialValues: initialState,
    validationSchema: validateArticle(),
    onSubmit: (values) => {

    },
  });

  const auth = useSelector(selectAuth);

  if (!auth.accessToken) return <NotFound />

  return (
    <>
      <Box mt={3} mb={2}>
        <Typography variant="h2" className={classes.title}>Создать пост</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={8}>
          <CreateForm formik={formikArticle} />
        </Grid>
        <Grid item xs={4}>
          <HorizontalCard article={formikArticle.values} />
        </Grid>
      </Grid>
    </>
  )
}

export default CreateArticle;
