import { makeStyles, Theme, Box, Typography } from '@material-ui/core';
import { FC } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  extraText: {
    marginTop: theme.spacing(0.5),
  },
}));

type CaptionProps = {
  title: string;
  description?: string;
}

export const Caption: FC<CaptionProps> = ({ title, description }) => {
  const classes = useStyles();
  return (
    <Box pt={3} pl={2} pr={2}>
      <Typography variant="h3">{title}</Typography>
      <Typography className={classes.extraText} variant="body2">{description}</Typography>
    </Box>
  )
}
