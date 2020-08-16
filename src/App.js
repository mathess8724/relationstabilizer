import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn';
import Home from './components/home/Home';
import { useState, useEffect } from 'react';
import FirebaseCfg from './components/configs/FirebaseCfg'
import * as firebase from 'firebase'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

function App() {

  const [user,setUser] = useState([])
  const [userDB, setUserDB] = useState([])
  

  const SetUserConnected = (user) => {
   
    setUser(user)
  }

  const handleRedirect = () => {
    console.log('redirect!')
    SetUserConnected([])
    
    
    
  }

  const handleSetDB = (target) => {

    let ref = firebase.database().ref(target)
    ref.on('value', snapshot => {
      setUserDB(snapshot.val())
      
  })
  }

  useEffect(() => {
    //FirebaseCfg()
     
    firebase.initializeApp(FirebaseCfg)
    firebase.analytics();

        
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUser(user)
        let target = `/Users/${user.uid}`
        console.log('user found, looking for DB')
    let ref = firebase.database().ref(target)
      ref.on('value', snapshot => {
      snapshot.val() && console.log('user DB found!')
      setUserDB(snapshot.val())
      
      
  })
      }
    });

          
  },[])
  return (
    <Router>
    <div className="App">
     {/*  <Header /> */}

      <Switch>
  <Route exact path='/' component={Home} children={ user.uid ? <Home user={user} /> : <Redirect to='/login' />} ></Route>      
  <Route exact path='/login'> { user.uid ? <Redirect to='/home' /> : <SignIn /> } </Route>        
        <Route exact path='/home' > { user.uid ? <Home setUserDB={setUserDB} userDB={userDB} setUser={setUser} user={user} /> : <Redirect to='/login' />  } </Route>        
      </Switch>
    </div>
    </Router>
  );
}

export default App;
