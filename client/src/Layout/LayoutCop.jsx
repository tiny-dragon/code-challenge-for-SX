import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import RedeemIcon from '@material-ui/icons/Redeem';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import Person from '@material-ui/icons/Person';
import TimeLine from '@material-ui/icons/Timeline';
import Publish from '@material-ui/icons/Publish';
import ExitToApp from '@material-ui/icons/ExitToApp';
import VpnKey from '@material-ui/icons/VpnKey';

import history from '../redux/history';
import { connect } from 'react-redux';
import { userSignOut } from '../redux/Auth/user.actions';
import { setCurrentProductId, setCurrentProductInfo } from '../redux/Item/item.action';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 1,
  },
  drawerPaper: {
    paddingTop: 50,
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
  },
  toolbar: theme.mixins.toolbar,
}));

function ClippedDrawer(props) {
  const { activeUrl, isAdmin, userName, setCurrentProductId, setCurrentProductInfo } = props;
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  function handleLogout(e) {
    props.userSignOut();
  }

  function navPush(url) {
    handleDrawerToggle();
    history.push(url);
  }

  const rdAdminMenu = () => (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        >
          Admin
        </ListSubheader>
      }
    >
      <ListItem button onClick={() => navPush('/app/customers')}>
        <ListItemIcon>
          <PeopleAlt color={activeUrl === '/app/customers' ? 'secondary' : 'inherit'} />
        </ListItemIcon>
        <ListItemText inputcolor={activeUrl === '/app/customers' ? 'secondary' : 'inherit'} primary="Customers" />
      </ListItem>
      <ListItem button onClick={() => navPush('/app/statistics')}>
        <ListItemIcon>
          <TimeLine color={activeUrl === '/app/statistics' ? 'secondary' : 'inherit'} />
        </ListItemIcon>
        <ListItemText inputcolor={activeUrl === '/app/statistics' ? 'secondary' : 'inherit'} primary="Statistics" />
      </ListItem>
    </List>
  );

  const rdCustomerMenu = () => (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        >
          Customer
        </ListSubheader>
      }
    >
      <ListItem button onClick={() => navPush('/app/product')}>
        <ListItemIcon>
          <RedeemIcon color={activeUrl === '/app/product' ? 'secondary' : 'inherit'} />
        </ListItemIcon>
        <ListItemText inputcolor={activeUrl === '/app/product' ? 'secondary' : 'inherit'} primary="Manage Auctions" />
      </ListItem>
      <ListItem button onClick={() => {
        setCurrentProductId(''); 
        setCurrentProductInfo({ 
          _id: '',
          productName: '',
          price: '',
          image: '',
          startDateTime: new Date(),
          expireDateTime: new Date(),
        }); 
        navPush('/app/product/new');
      }}>
        <ListItemIcon>
          <Publish color={activeUrl === '/app/product/new' ? 'secondary' : 'inherit'} />
        </ListItemIcon>
        <ListItemText inputcolor={activeUrl === '/app/product/new' ? 'secondary' : 'inherit'} primary="Post Product" />
      </ListItem>
    </List>
  );

  const rdProfileMenu = () => (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        >
          Profile
        </ListSubheader>
      }
    >
      <ListItem button onClick={() => {}}>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItem>
      <ListItem button onClick={() => {}}>
        <ListItemIcon>
          <VpnKey />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItem>
      <ListItem button onClick={handleLogout}>
        <ListItemIcon>
          <ExitToApp/>
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap align="left" onClick={() => navPush('/app')}>
            Jin
          </Typography>
          <div className={classes.grow}></div>
          <Typography noWrap align="right">
            {userName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        {rdCustomerMenu()}
        <Divider />
        {isAdmin ? rdAdminMenu() : ''}
        <Divider />
        {rdProfileMenu()}
      </Drawer>
      <main className={classes.content}>
          {props.children}
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
    activeUrl: state.auth.liveUrl,
    isAdmin: state.auth.isAdmin,
    userName: state.auth.userName
  });
  
const mapDispatchToProps = {
    userSignOut,
    setCurrentProductId,
    setCurrentProductInfo
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClippedDrawer);
