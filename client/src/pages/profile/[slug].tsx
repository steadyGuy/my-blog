import { Container, Grid, Paper, Theme, makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { Avatar } from '../../components/Profile/Avatar';
import { Sidebar } from '../../components/Profile/Sidebar';
import { Blogs } from '../../components/Profile/Tabs/Blogs';
import { Personal } from '../../components/Profile/Tabs/Personal';
import { IParams } from '../../interfaces/user';
import { selectAuth } from '../../redux/selectors';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {

  },
  root: {
    marginTop: theme.spacing(5),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { slug } = useParams<IParams>();
  const { user } = useSelector(selectAuth);
  const [currentTab, setCurrentTab] = useState<'Персональные' | 'Блоги'>('Персональные');

  return (
    user?.id === slug ? <Container component="main" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper square elevation={1}>
            <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper square elevation={1}>
            {currentTab === 'Персональные' && <Personal />}
            {currentTab === 'Блоги' && <Blogs />}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper square elevation={1}>
            <Avatar />
          </Paper>
        </Grid>
      </Grid>
    </Container> :
      <Typography variant="h2" align="center" style={{ marginTop: 40, }}>Профиль недоступен</Typography>
  )
}

export default Profile
