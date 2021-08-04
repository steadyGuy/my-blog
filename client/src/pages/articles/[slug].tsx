import { Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { HorizontalCard } from '../../components/cards/HorizontalCard';
import NotFound from '../../components/global/NotFound/NotFound';
import { ICategory } from '../../interfaces';
import { IParams } from '../../interfaces/user';
import { getArticlesBySlug } from '../../redux/actions/ArticleAction';
import { selectArticlesByCategory, selectCategories } from '../../redux/selectors';

const Articles = () => {

  const { slug }: IParams = useParams();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const articlesByCategory = useSelector(selectArticlesByCategory);
  const [category, setCategory] = useState<ICategory>();

  useEffect(() => {
    const cat = categories.find(item => item.slug === slug);
    if (cat) setCategory(cat);

  }, [slug, categories])

  useEffect(() => {
    if (!category) return;

    if (articlesByCategory.some(item => item.id === category.id)) return;

    dispatch(getArticlesBySlug(category.id));

  }, [category, dispatch, articlesByCategory]);

  if (!category?.id) {
    return <NotFound />
  };

  return (
    <>
      <Typography variant="h2" align="center">{category.name}</Typography>
      <Grid container spacing={3}>
        {articlesByCategory.find(item => item.id === category.id)?.articles?.map(article => {
          return (
            <Grid item xs={3} key={article._id}>
              <HorizontalCard shortCard article={{ ...article, category: article.category }} />
            </Grid>
          );
        })}
      </Grid>
    </>
  )
}

export default Articles
