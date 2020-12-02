import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Layout from './Layout'
import {useCookies} from 'react-cookie'
import CommonSnackbar from './components/common/CommonSnackbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Clock from './components/book/Clock'
import SignInView from './components/member/SignInView'
import SignUpView from './components/member/SignUpView'
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
    if(cookies['jwt'] != undefined)
        setHasCookie(false)
  },[])
  return (
    <div className={classes.root}>
      {
        hasCookie === false ? 
        (
          <Router>
            <Route exact path="/signup" ><SignUpView setHasCookie={setHasCookie}/></Route>
            <Route path="/signin" ><SignInView setHasCookie={setHasCookie}/></Route>
            </Router>
        ):
        (
          <Router>
          <Layout>
               <Route exact path="/book/:post_id" component={Clock}/>
          </Layout>
        </Router>

        )
      }
        <CommonSnackbar/>
    </div>
  );
}
