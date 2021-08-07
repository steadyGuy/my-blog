import { Box, createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CreateForm } from '../components/cards/CreateForm';
import { HorizontalCard } from '../components/cards/HorizontalCard';
import { Editor } from '../components/Editor';
import NotFound from '../components/global/NotFound/NotFound';
import { SubmitButton } from '../components/SubmitBtn';
import { useInterval } from '../hooks/useInterval';
import { IArticle } from '../interfaces';
import { createArticle, updateArticle } from '../redux/actions/ArticleAction';
import { selectAuth } from '../redux/selectors';
import { compare } from '../utils/compareObjectByValues';
import { getAPI } from '../utils/fetchData';
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
  const [update, setUpdate] = useState<{ yes: boolean, id: string }>({ yes: false, id: '' });
  const divRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const formikArticle = useFormik({
    validateOnChange: false,
    initialValues: initialState,
    validationSchema: validateArticle(),
    onSubmit: async (values) => {
      debugger;
      if (update.yes) {
        dispatch(updateArticle(formikArticle.values, update.id, auth.accessToken));
      } else {
        dispatch(createArticle(formikArticle.values, auth.accessToken));
      }
    },
  });

  useEffect(() => {

    (async () => {
      const isUpdating = history.location.search.includes('update');
      if (isUpdating) {
        const articleId = history.location.search.slice(8);
        const { article } = await getAPI(`article/${articleId}`);
        console.log('articlearticle', article);
        // TODO: Сделать через сохранения стейта article в redux (вместо async-запроса)
        // по типу в reducers: currentArticle: article (на подобии этого)
        formikArticle.setValues({
          ...article, id: articleId,
        });
        setBody(article.content);
        return setUpdate({ yes: true, id: history.location.search.slice(8) })
      }
      setUpdate({ yes: false, id: '' });
      const preSavedArticleState = localStorage.getItem('article_last_state');
      // обязательно проверить update ли или нет
      if (preSavedArticleState) {
        let obj = JSON.parse(preSavedArticleState);
        setBody(obj.content);
        formikArticle.setValues(obj);
      }
    })()

  }, [history.location.search]);

  // Каждую минуту обновлять стейт локально чтобы предотвратить
  // потерю данных после случайно закрытой вкладки
  useInterval(() => {
    if (update.yes) return;
    if (compare(initialState, formikArticle.values)) return;
    let { thumbnail } = formikArticle.values;

    // мы не сохраняем thumbnail локально
    // после закрытия он теряеться (не критично)
    // POSSIBLE TODO: сохранять как base64 в localstorage
    thumbnail = '';

    localStorage.setItem('article_last_state', JSON.stringify({
      ...formikArticle.values, thumbnail,
    }));
  }, 30 * 100);

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
