import React from 'react';
import './App.css';
import User from './Components/User/User';
import 'tachyons'
import { Switch, Route, useHistory, Link } from 'react-router-dom';
import UserProfile from './Components/UserProfile/UserProfile';
import Post from './Components/Post/Post';
import PostDetails from './Components/PostDetails/PostDetails';
import UserMedia from './Components/UserMedia/UserMedia';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { green } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > svg': {
      margin: theme.spacing(2),
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

function HomeIcon(props) {
  return(
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  )
}

function App() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/" className="link">
        {['Home'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <HomeIcon color="primary" /> : <HomeIcon color="primary"/>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/user" className="link">
        {['User'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <AccountCircleIcon color="primary" /> : <AccountCircleIcon color="primary"/>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        </Link>
      </List>
    </div>
  );
          const history = useHistory();
  return (
    <div className="App">
      <div className="flex justify-between ml4 mr4">
      <div className="logo">
        <h1 style={{cursor: 'pointer'}} onClick={() => {
          history.push('/home')
        }} className="grow"><span className="logoText_1">Social</span> <span className="logoText_2">Buddy</span></h1>
      </div>
      {['Right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <span className="b f3">
            <MenuIcon/>
            </span>
          </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
     <div className="flex flex-wrap justify-around">
     <Switch>
       <Route exact path="/">
       <User />
       </Route>
       <Route exact path="/home">
       <User />
       </Route>
       <Route exact path="/user">
       <User />
       </Route>
       <Route exact path="/user/:userId">
       <UserProfile/>
       </Route>
       <Route exact path='/user/:userId/posts'>
         <Post />
       </Route>
       <Route exact path='/user/:userId/posts/:postId'>
         <PostDetails/>
       </Route>
       <Route exact path='/user/:userId/media'>
         <UserMedia/>
       </Route>
       <Route path="*" render={() => {
         return (
           <div className="">
             <h1>404 not found</h1>
             <a href="/home" className="link">Go Home</a>
           </div>
         )
       }}/>
     </Switch>
     </div>
    </div>
  );
}

export default App;
