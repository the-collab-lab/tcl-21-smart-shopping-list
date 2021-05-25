import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '1rem',
    textAlign: 'center',
  },
  paper1: {
    backgroundColor: theme.palette.common.darkBlue,
    color: theme.palette.common.lightBlue,
  },
  paper2: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
  paper3: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  paper4: {
    backgroundColor: theme.palette.common.yellow,
    color: 'white',
  },
  paper5: {
    backgroundColor: theme.palette.common.red,
    color: 'white',
  },
}));

const ThemeTest = () => {
  const classes = useStyles();
  return (
    <section>
      <h1>Theme Tester Page</h1>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Paper className={`${classes.paper} ${classes.paper1}`}>
            <Typography variant="h1">Header 1</Typography>
            <Typography variant="h2">Header 2</Typography>
            <Typography variant="h3">Header 3</Typography>
            <Typography variant="h4">Header 4</Typography>
            <Typography variant="h5">Header 5</Typography>
            <Typography variant="h6">Header 6</Typography>
            <Typography variant="body1">Body Text</Typography>
            <Typography variant="body2">Body Text</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={`${classes.paper} ${classes.paper2}`}>
            <Typography variant="h5">Grid 2</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={`${classes.paper} ${classes.paper3}`}>
            <Typography variant="h5">Grid 3</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={`${classes.paper} ${classes.paper4}`}>
            <Typography variant="h5">Grid 4</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={`${classes.paper} ${classes.paper5}`}>
            <Typography variant="h5">Grid 5</Typography>
          </Paper>
        </Grid>
      </Grid>
    </section>
  );
};

export default ThemeTest;
