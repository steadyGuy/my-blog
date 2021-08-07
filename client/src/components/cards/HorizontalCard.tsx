import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, makeStyles, Box, Theme } from '@material-ui/core'
import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IArticle } from '../../interfaces';
import { selectCategories } from '../../redux/selectors';

const useStyles = makeStyles((theme: Theme) => (
  {
    root: {
      maxWidth: 345,
      '& .MuiCardActions-root': {
        paddingTop: 0,
      }
    },
    date: {
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: theme.palette.primary.dark,
      borderRadius: '0 5px 5px 0',
      color: '#fff',
      fontSize: 12,
      padding: 6,
    }
  }
));

type HorizontalCardProps = {
  article: IArticle;
  shortCard?: boolean;
}

const chooseImage = (image: string | File) => {
  if (typeof image === 'string') {
    return image;
  }

  return URL.createObjectURL(image);
}

export const HorizontalCard: FC<HorizontalCardProps> = ({ article, shortCard = false }) => {

  const classes = useStyles();
  const categories = useSelector(selectCategories);

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/article/${article._id}`}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={
            article.thumbnail ? chooseImage(article.thumbnail) : 'https://www.looper.com/img/gallery/battle-in-5-seconds-after-meeting-release-date-characters-and-plot-what-we-know-so-far/intro-1624546404.jpg'
          }
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography className={classes.date} variant="body2" color="textSecondary" gutterBottom>
            {article.createdAt}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {!article.title ? 'Заголовок' : article.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {!article.description ? 'Краткое описание статьи...' : !shortCard
              ? article.description : article.description.slice(0, 95) + ' ...'}
          </Typography>
          <Box mt={2}>
            {!shortCard &&
              <Typography variant="body2" color="textSecondary">
                Категория: <i>
                  {
                    categories.find(cat =>
                      cat.id === ((typeof article.category === 'string') ? article.category : article.category._id))?.name
                    || 'Не выбрано'
                  }
                </i>
              </Typography>
            }
            <Typography variant="body2" color="textSecondary">
              Автор: <i>
                {
                  typeof article.user !== 'string' &&
                  <Link to={`/profile/${article.user._id}`}>{article.user.name}</Link>
                }
              </i>
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Button component={Link} to={`/article/${article._id}`} size="small" color="primary">
          Читать дальше
        </Button>
      </CardActions>
    </Card>
  )
}