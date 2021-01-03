import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Layout from './Layout'
import {useCookies} from 'react-cookie'
import CommonSnackbar from './components/common/CommonSnackbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import BookView from './components/book/BookView'
import SignInView from './components/member/SignInView'
import SignUpView from './components/member/SignUpView'
import MyBookList from './components/book/MyBookList'
import './App.css'
import CheckIn from './components/book/CheckIn'
import CheckOut from './components/book/CheckOut'
import WaitList from './components/book/WaitList'
const useStyles = makeStyles((theme) => ({
  root: {
    width : '100%',
    height : '100%'
  },
}));


export default function App() {
  const classes = useStyles();
  const [cookies, setCookie,removeCookie] = useCookies(['jwt'])
  const [hasCookie,setHasCookie] = React.useState(false)
  React.useEffect(()=>{
    if(cookies['jwt'] == undefined){
        setHasCookie(false)
      }
  },[])
  return (
    <div className={classes.root}>

        <CommonSnackbar/>
        <Router>

      {
        hasCookie === false ? 
        (
          <div>
            <Route exact path="/signup" ><SignUpView setHasCookie={setHasCookie}/></Route>
            <Route ><SignInView setHasCookie={setHasCookie}/></Route>
            </div>
        ):
        (
          <Layout cookies={cookies} hasCookie={hasCookie} setHasCookie={setHasCookie} removeCookie={removeCookie} hasCookie={hasCookie}>
              <Route exact path="/" component={MyBookList}/>
               <Route exact path="/book/:room_id" component={BookView}/>
               <Route exact path="/checkin/:book_id" component={CheckIn}/>
               <Route exact path="/checkout/:book_id" component={CheckOut}/>
               <Route exact path="/wait" component={WaitList}/>
          </Layout>
        )
      }
        </Router>

    </div>
  );
}
