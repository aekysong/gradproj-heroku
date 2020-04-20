import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Search from '../components/Search';
import HomeNotice from '../components/NoticeList';
import HomePost from '../components/PostList';
import RecommendUniv from '../components/RecommendList';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  head: {
    padding: theme.spacing(1),
  }
}));

export default function HomeLayout(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" className={classes.head}>파견 대학 검색</Typography>
            <Divider />
            <Search />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <RecommendUniv data={props.user} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <HomeNotice />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <HomePost />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
