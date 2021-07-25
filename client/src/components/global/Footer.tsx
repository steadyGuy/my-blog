import { AppBar, createStyles, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      marginTop: theme.spacing(10),
    }
  })
);

const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.footer} color="default" position="static" elevation={0}>
      <Toolbar>
        <Typography variant="body1">© Some blog 2021. Powered by Somebody</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
