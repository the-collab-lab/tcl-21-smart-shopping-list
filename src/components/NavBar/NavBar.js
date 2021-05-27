import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  appBarContent: {
    padding: '2rem',
    height: '20vh',
    display: 'flex',
    justifyContent: 'center',
  },
  appBarText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 30,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 42,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    background: 'rgb(84,101,255)',
    background:
      'linear-gradient(0deg, rgba(84,101,255,1) 0%, rgba(203,243,240,1) 100%)',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    fontSize: '84px',
    marginBottom: '2rem',
  },
  sideBarIcon: {
    color: theme.palette.common.darkBlue,
  },
  sideBarText: {
    color: theme.palette.common.darkBlue,
  },
  sideBarTextHighlight: {
    color: theme.palette.common.lightBlue,
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: 800,
  },
  link: {
    textDecoration: 'none',
  },
  tokenContainer: {
    alignItems: 'center',
  },
}));

function NavBar(props) {
  const { window } = props;
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <ShoppingCartRoundedIcon color="primary" className={classes.logo} />
      <Divider />
      <br />
      <List>
        <ListItem
          button
          className={classes.sideBarItem}
          onClick={props.clearToken}
        >
          <ListItemIcon>
            <HomeRoundedIcon className={classes.sideBarIcon} />
          </ListItemIcon>
          <ListItemText primary="Home" className={classes.sideBarText} />
        </ListItem>
      </List>
      <br />
      <Divider />
      <br />
      <List>
        <Link to="/list" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <ListAltRoundedIcon
                className={
                  history.location.pathname === '/list'
                    ? classes.active
                    : classes.sideBarIcon
                }
              />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="body1"
                component="p"
                className={
                  history.location.pathname === '/list'
                    ? classes.active
                    : classes.sideBarText
                }
              >
                List
              </Typography>
            </ListItemText>
          </ListItem>
        </Link>
        <Link to="/additem" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <ShoppingBasketRoundedIcon
                className={
                  history.location.pathname === '/additem'
                    ? classes.active
                    : classes.sideBarIcon
                }
              />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="body1"
                component="p"
                className={
                  history.location.pathname === '/additem'
                    ? classes.active
                    : classes.sideBarText
                }
              >
                Add Item
              </Typography>
            </ListItemText>
          </ListItem>
        </Link>
      </List>
      <br />
      <Divider />
      <br />
      <List>
        <ListItem
          button
          className={classes.sideBarItem}
          className={classes.tokenContainer}
        >
          <ListItemIcon>
            <VpnKeyIcon className={classes.sideBarIcon} />
          </ListItemIcon>
          <Grid container direction="column">
            <Grid item>
              <ListItemText
                primary="Shareable Key:"
                className={classes.sideBarText}
              />
            </Grid>
            <Grid item>
              <ListItemText>
                <Typography
                  variant="h6"
                  component="p"
                  className={classes.sideBarTextHighlight}
                >
                  {props.token}
                </Typography>
              </ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.appBarContent}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant={matchesSM ? 'h6' : 'h2'}
            component="h1"
            align="center"
            className={classes.appBarText}
          >
            {matchesSM ? 'Smart List' : 'Smart Shopping List'}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

NavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavBar;
