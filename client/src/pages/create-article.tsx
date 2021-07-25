import { Box, createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { FormEvent, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { CreateForm } from '../components/cards/CreateForm';
import { HorizontalCard } from '../components/cards/HorizontalCard';
import { Editor } from '../components/Editor';
import NotFound from '../components/global/NotFound/NotFound';
import { SubmitButton } from '../components/SubmitBtn';
import { selectAuth, selectCategories } from '../redux/selectors';
import { validateArticle } from '../utils/validateAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {

    },
    button: {
      padding: theme.spacing(1, 6, 1, 6),
      cursor: 'pointer',
      marginTop: theme.spacing(3),
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

  const [body, setBody] = useState('');
  const divRef = useRef<HTMLDivElement>(null);

  const formikArticle = useFormik({
    validateOnChange: false,
    initialValues: initialState,
    validationSchema: validateArticle(),
    onSubmit: (values) => {

    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formikArticle.handleSubmit(e);
  }

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
      <Box mt={5}>
        <Editor setBody={setBody} />
        <SubmitButton
          className={classes.button}
          color="primary"
          type="button"
          onClick={handleSubmit}
          fullWidth={false}
          title={"Сохранить"}
        />

        <div ref={divRef} dangerouslySetInnerHTML={{ __html: body }}></div>

      </Box>
    </>
  )
}

export default CreateArticle;
