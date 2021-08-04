import { Box, Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Alert/Loader';
import { HorizontalCard } from '../components/cards/HorizontalCard';
import { getHomeArticles } from '../redux/actions/ArticleAction';
import { selectArticlesHome } from '../redux/selectors';

const Home = () => {

  const dispatch = useDispatch();
  const articlesByCategory = useSelector(selectArticlesHome)

  useEffect(() => {

    dispatch(getHomeArticles());

  }, [dispatch]);

  if (articlesByCategory.length === 0) return <Loader />;

  return (
    <div>
      <h2>Home</h2>
      {articlesByCategory.map(cat => {
        console.log(cat)
        return (
          <div key={cat._id}>
            <Link to={`/articles/${cat.slug}`}>
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
          </div>
        );
      })}
    </div>
  )
}

export default Home
