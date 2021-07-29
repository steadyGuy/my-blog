import { Box, Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HorizontalCard } from '../components/cards/HorizontalCard';
import { getHomeArticles } from '../redux/actions/ArticleAction';
import { selectArticles } from '../redux/selectors';

const Home = () => {

  const dispatch = useDispatch();
  const articlesByCategory = useSelector(selectArticles)

  useEffect(() => {

    dispatch(getHomeArticles());

  }, [dispatch]);

  return (
    <div>
      <h2>Home</h2>
      {articlesByCategory.map(cat => {
        return (
          <>
            <Link to={`/articles/${cat.name}`}>
              <h3>{cat.name} (${cat.count})</h3>
            </Link>
            <hr />
            <Grid container spacing={3}>
              {cat.articles.map(article => {
                return <Grid item xs={3} key={article._id}>
                  {
                    <HorizontalCard shortCard article={{ ...article, category: article.category }} />
                  }
                </Grid>
              })}
            </Grid>
            {cat.count > 4 &&
              <Link to={`/blogs/${cat.name}`}>
                Загрузить больше &gt;&gt;
              </Link>
            }
          </>
        );
      })}
    </div>
  )
}

export default Home
