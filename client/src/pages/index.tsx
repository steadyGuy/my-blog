import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getHomeArticles } from '../redux/actions/ArticleAction';

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getHomeArticles());

  }, [dispatch])

  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

export default Home
