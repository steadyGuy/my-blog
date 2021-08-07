import { Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { IParams } from '../../interfaces/user';
import { getAPI } from '../../utils/fetchData';

const Article = () => {

  const { slug } = useParams<IParams>();

  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const history = useHistory();

  const handleUpdate = () => {
    history.push(`/create-article?update=${slug}`);
  }

  useEffect(() => {

    (async () => {
      try {
        const { article } = await getAPI(`article/${slug}`);
        setBody(article.content);
        setTitle(article.title);
      } catch (error) {

      }
    })();

  }, [slug])

  return (
    <section>
      <Typography align="center" variant="h2">{title}</Typography>
      <div
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <Button variant="contained" onClick={handleUpdate}>Обновить статью</Button>
    </section>
  )
}

export default Article
