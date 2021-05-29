import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Logo from '../Logo/Logo';

const useStyles = makeStyles((theme) => ({
  appBarContent: {
    padding: '2rem',
    height: '15vh',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Mulish',
  },
  appBarText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 30,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 42,
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.appBarContent}>
        <Typography
          variant={matchesSM ? 'h6' : 'h2'}
          component="h1"
          align="center"
          className={classes.appBarText}
        >
          <Logo />
          Smart Cart
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
