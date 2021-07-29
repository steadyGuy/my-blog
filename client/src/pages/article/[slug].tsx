import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { IParams } from '../../interfaces/user';
import { getAPI } from '../../utils/fetchData';

const Article = () => {

  const { slug } = useParams<IParams>();

  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');

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
    </section>
  )
}

export default Article
