import React from 'react';
import googleIco from '../components/img/google-ico.png';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './SignIn.scss';
import { useRef } from 'react';
import * as firebase from 'firebase';
import {Redirect} from 'react-router-dom';

function Copyright() {


  return (

    

    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Relation stabilizer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {

const submitRef = useRef('submitRef')  

const handleCreateAccount = (target, user) => {
    console.log('creating account . . .')
    let account = 
        
    {
      "banned" : false,
      "name" : "displayName()",
      "relations" : [ [
            {
          "id" : `rel-${Date.now()}`,
          "currentValue" : "50%",
          "actions" : [ 
            {
              "actionDetail" : " a short action description",
              "actionValue" : 10,
              "date" : new Date(Date.now()),
              "id" : "action-" + Date.now()
            }
          ]
          
        }
      ]
     ]
    }
        
    
    
    console.log(target)
    let ref = firebase.database().ref(target)
        ref.set(account)
    

}
function handleConnect(ref,e){
    console.log('connect with google pop up');
    // Using a popup.
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
firebase.auth().signInWithPopup(provider).then(function(result) {
 // This gives you a Google Access Token.
 var token = result.credential.accessToken;
 // The signed-in user info.
 var user = result.user;
 let target = `/Users/${user.uid}`
 let ref = firebase.database().ref(target)
    ref.once("value")
    .then(function(snapshot) {
      snapshot.val() ? console.log('account found') : handleCreateAccount(target, user)
    });
 console.log('Connected!')
});  
  
   

    
}

  const classes = useStyles();

  return (
    <div className="loginBody">        
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Sign in
        </Typography>
        <form className={classes.form} noValidate
               onSubmit={(e) => {handleConnect(); e.preventDefault();}}
        >
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          /> */}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            ref={submitRef}
            type="submit"
            
          >
            <img className='googleIco' src={googleIco} alt="ico"/> Sign In with Google
          </Button>
          
         {/*  <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}