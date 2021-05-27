import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  footerHome: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  footer: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    position: 'fixed',
    bottom: 0,
  },
  container: {
    textAlign: 'center',
    padding: '1rem',
    color: theme.palette.primary.main,
  },
  link: {
    color: theme.palette.common.darkBlue,
  },
}));

const Footer = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <footer
      className={
        matchesSM || history.location.pathname === '/'
          ? classes.footerHome
          : classes.footer
      }
    >
      <Container className={classes.container}>
        <Typography>
          Made with{' '}
          <span role="img" aria-label="heart">
            🖤
          </span>{' '}
          by{' '}
          <Link
            className={classes.link}
            href="https://the-collab-lab.codes/"
            target="_blank"
          >
            TCL-21
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
