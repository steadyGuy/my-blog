import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, makeStyles, Box } from '@material-ui/core'
import React, { FC } from 'react'
import { IArticle } from '../../interfaces';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

type HorizontalCardProps = {
  article: IArticle;
}

export const HorizontalCard: FC<HorizontalCardProps> = ({ article }) => {

  const classes = useStyles();
  console.log(article)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={article.thumbnail ? URL.createObjectURL(article.thumbnail) : 'https://www.looper.com/img/gallery/battle-in-5-seconds-after-meeting-release-date-characters-and-plot-what-we-know-so-far/intro-1624546404.jpg'}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {!article.title ? 'Title' : article.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {!article.description ? 'description...' : article.description}
          </Typography>
          <Box mt={2}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {article.createdAt}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Категория: <i>{article.category}</i>
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
