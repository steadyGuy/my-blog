import { Box, createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CreateForm } from '../components/cards/CreateForm';
import { HorizontalCard } from '../components/cards/HorizontalCard';
import { Editor } from '../components/Editor';
import NotFound from '../components/global/NotFound/NotFound';
import { SubmitButton } from '../components/SubmitBtn';
import { useInterval } from '../hooks/useInterval';
import { IArticle } from '../interfaces';
import { createArticle } from '../redux/actions/ArticleAction';
import { selectAuth } from '../redux/selectors';
import { compare } from '../utils/compareObjectByValues';
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
  const initialState: IArticle = {
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
      dispatch(createArticle(formikArticle.values, auth.accessToken));
    },
  });

  // Каждую минуту обновлять стейт локально чтобы предотвратить
  // потерю данных после случайно закрытой вкладки
  useInterval(() => {
    if (compare(initialState, formikArticle.values)) return;
    let { thumbnail } = formikArticle.values;

    if (!thumbnail) {
      thumbnail = '';
    }

    // if (typeof thumbnail !== 'string' && thumbnail) {
    //   console.log(thumbnail, 'thumbnail')
    //   thumbnail = URL.createObjectURL(thumbnail);
    // }

    localStorage.setItem('article_last_state', JSON.stringify({
      ...formikArticle.values, thumbnail,
    }));
    console.log('LOCALLY SAVED!');
  }, 30 * 100);

  useEffect(() => {

    const preSavedArticleState = localStorage.getItem('article_last_state');
    if (preSavedArticleState) {
      let obj = JSON.parse(preSavedArticleState);
      // let { thumbnail } = obj;
      // if (typeof thumbnail === 'string' && thumbnail) {
      //   console.log(thumbnail, 'thumbnail');
      //   const data = await fetch(thumbnail);
      //   const blob = await data.blob();
      //   // URL.revokeObjectURL(thumbnail);
      //   thumbnail = blob;
      // }
      setBody(obj.content);
      formikArticle.setValues(obj);
    }

  }, []);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    formikArticle.setFieldValue('content', body);
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
          <HorizontalCard article={{ ...formikArticle.values, _id: 'random-string-that-is-not-important' }} />
        </Grid>
      </Grid>
      <Box mt={5}>
        <Editor setBody={setBody} body={body} />
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
