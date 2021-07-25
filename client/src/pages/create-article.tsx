import { Box, createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CreateForm } from '../components/cards/CreateForm';
import { HorizontalCard } from '../components/cards/HorizontalCard';
import { Editor } from '../components/Editor';
import NotFound from '../components/global/NotFound/NotFound';
import { SubmitButton } from '../components/SubmitBtn';
import { createArticle } from '../redux/actions/ArticleAction';
import { selectAuth } from '../redux/selectors';
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
    bodyWrapper: {
      whiteSpace: 'normal',
      lineBreak: 'anywhere',
    },
  }),
);

const CreateArticle = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialState = {
    user: '',
    title: '',
    content: '',
    description: '',
    thumbnail: '',
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
      dispatch(createArticle(formikArticle.values, auth.accessToken))
    },
  });

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    formikArticle.setFieldValue('content', div?.innerText)
  }, [body]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth.accessToken) return;
    formikArticle.handleSubmit(e);

    // try {
    //   const photo = await imageUpload();
    // } catch (err) {
    //   console.log('Error with image loading', err);
    // }
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
        <Typography align="right" variant="caption" color="error" component="p">
          {formikArticle.touched.content && formikArticle.errors.content ? formikArticle.errors.content : null}
        </Typography>
        <SubmitButton
          className={classes.button}
          color="primary"
          type="button"
          onClick={handleSubmit}
          fullWidth={false}
          title={"Сохранить"}
        />

        <div
          className={classes.bodyWrapper}
          ref={divRef}
          dangerouslySetInnerHTML={{ __html: body }}
        />

      </Box>
    </>
  )
}

export default CreateArticle;
