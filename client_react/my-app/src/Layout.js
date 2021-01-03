import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {Link} from 'react-router-dom'
import LogoutButton from './components/common/LogoutButton'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  listText:{
    color:'black'
  },
  title:{
    color:'white'
  },
  contentWrapper:{
    height: '88vh',
    "@media (min-device-width: 481px)": { // PC
      width : '97.5vw',
    },
  "@media (min-device-width: 320px) and (max-device-width: 480px)": { // Mobile
    width : '86vw',
   }
  },
  accountIconArea:{
    width:'100%',
  },
  toolBar:{
    width: 'auto',
    disply : 'flex',
    background:'black'
  }
}));

export default function Layout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const children = props.children
  const setHasCookie = props.setHasCookie
  const removeCookie = props.removeCookie
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link   
        to={{
            pathname: "/",
        }}
        style={{ textDecoration: 'none' }}
        >
          <Typography variant="h6" noWrap className={classes.title}>
            SE Smart 330
          </Typography>
          </Link>

          <div alignSelf="flex-end" className={classes.accountIconArea}>
              <LogoutButton removeCookie={removeCookie}  setHasCookie={setHasCookie}/>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <Link   
        to={{
            pathname: "/",
        }}
        onClick={() => setOpen(!open)}
        style={{ textDecoration: 'none' }}
        >
            <ListItem button>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText className={classes.listText}>홈</ListItemText>
            </ListItem>
        </Link>
        <Link   
        to={{
            pathname: "/wait",
        }}
        onClick={() => setOpen(!open)}
        style={{ textDecoration: 'none' }}
        >
            <ListItem button>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText className={classes.listText}>대기열</ListItemText>
            </ListItem>
        </Link>
        <Link   
        to={{
            pathname: "/book/A1",
        }}
        onClick={() => setOpen(!open)}
        style={{ textDecoration: 'none' }}
        >
            <ListItem button>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText className={classes.listText}>A1</ListItemText>
            </ListItem>
          </Link>
          <Link   
        to={{
            pathname: "/book/A2",
        }}
        onClick={() => setOpen(!open)}
        style={{ textDecoration: 'none' }}
        >
            <ListItem button>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText className={classes.listText}>A2</ListItemText>
            </ListItem>
          </Link>
          <Link   
        to={{
            pathname: "/book/A3",
        }}
        onClick={() => setOpen(!open)}
        style={{ textDecoration: 'none' }}
        >
            <ListItem button>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText className={classes.listText}>A3</ListItemText>
            </ListItem>
          </Link>
          <Link   
        to={{
            pathname: "/book/A4",
        }}
        onClick={() => setOpen(!open)}
        style={{ textDecoration: 'none' }}
        >
            <ListItem button>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText className={classes.listText}>A4</ListItemText>
            </ListItem>
          </Link>
          <Link   
        to={{
            pathname: "/book/B1",
        }}
        onClick={() => setOpen(!open)}
        style={{ textDecoration: 'none' }}
        >
            <ListItem button>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText className={classes.listText}>B1</ListItemText>
            </ListItem>
          </Link>
          <Link   
        to={{
            pathname: "/book/B2",
        }}
        onClick={() => setOpen(!open)}
        style={{ textDecoration: 'none' }}
        >
            <ListItem button>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText className={classes.listText}>B2</ListItemText>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div className={classes.contentWrapper}>
          {children}
        </div>
        
      </main>
    </div>
  );
}
